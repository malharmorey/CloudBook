import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteCard from './NoteCard';
import { useNavigate } from 'react-router-dom';

function Notes() {
	const context = useContext(noteContext);
	const { notes, getAllNotes, editNote } = context;
	const ref = useRef(null);
	let navigate = useNavigate();

	useEffect(() => {
		localStorage.getItem('token') !== null ? getAllNotes() : navigate('/login');
	}, []); // eslint-disable-line

	const [note, setNote] = useState({
		etitle: '',
		edescription: '',
		etag: '',
		id: '',
	});

	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({
			etitle: currentNote.title,
			edescription: currentNote.description,
			etag: currentNote.tag,
			id: currentNote._id,
		});
	};

	const handleSaveClick = () => {
		editNote(note.id, note.etitle, note.edescription, note.etag);
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<>
			<button
				type='button'
				className='btn btn-primary d-none '
				data-bs-toggle='modal'
				data-bs-target='#updateModal'
				ref={ref}
			>
				launch
			</button>
			{/* ///////--------------EDIT-NOTES-MODAL------------////// */}
			<div
				className='modal fade'
				id='updateModal'
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'>
					<div className='modal-content modalCard'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Edit Note
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<form>
								<div className='mb-3'>
									<label htmlFor='title' className='col-form-label'>
										Title:
									</label>
									<input
										type='text'
										name='etitle'
										className='form-control'
										id='etitle'
										onChange={onChange}
										value={note.etitle}
										minLength={3}
										required
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='description' className='col-form-label'>
										Note:
									</label>
									<textarea
										className='form-control'
										id='edescription'
										name='edescription'
										rows='6'
										onChange={onChange}
										value={note.edescription}
										minLength={5}
										required
									></textarea>
								</div>
								<div className='mb-3'>
									<label htmlFor='tag' className='col-form-label'>
										Tags:
									</label>
									<input
										type='text'
										className='form-control'
										id='etag'
										name='etag'
										onChange={onChange}
										value={note.etag}
									/>
								</div>
							</form>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary bg-secondary bg-gradient'
								data-bs-dismiss='modal'
							>
								Close
							</button>
							<button
								type='button'
								className='btn btn-success bg-success bg-gradient'
								data-bs-dismiss='modal'
								disabled={
									note.etitle.length < 3 || note.edescription.length < 5
								}
								onClick={handleSaveClick}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='row'>
				{notes.length === 0 && (
					<NoteCard title={'Nothing in Here, but you and me'} date={''} />
				)}
				{notes.map((note) => {
					return (
						<div className='col-md-6 p-0' key={note._id}>
							<NoteCard
								title={note.title ? note.title : 'No title available'}
								description={
									note.description
										? note.description
										: 'No description available'
								}
								tag={note.tag}
								date={note.date}
								id={note._id}
								updateNote={updateNote}
								note={note}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Notes;
