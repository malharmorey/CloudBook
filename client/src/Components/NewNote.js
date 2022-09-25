import React, { useState, useContext } from 'react';
import '../StyleSheets/newNote.css';
import noteContext from '../context/notes/NoteContext';

function NewNote() {
	const context = useContext(noteContext);
	const { addNote } = context;
	const [note, setNote] = useState({
		title: '',
		description: '',
		tag: '',
	});

	const handleSaveClick = (e) => {
		addNote(note.title, note.description, note.tag);
		setNote({ title: '', description: '', tag: '' });
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	return (
		<>
			<button
				type='button'
				className='btn  addNewNoteBtn'
				data-bs-toggle='modal'
				data-bs-target='#newModal'
			>
				&#43;
			</button>

			{/* ///////--------------NEW-NOTE-MODAL------------////// */}
			<div
				className='modal fade'
				id='newModal'
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'>
					<div className='modal-content modalCard'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								New Note
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
										name='title'
										className='form-control'
										id='title'
										onChange={onChange}
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='description' className='col-form-label'>
										Note:
									</label>
									<textarea
										className='form-control'
										id='description'
										name='description'
										rows='6'
										onChange={onChange}
									></textarea>
								</div>
								<div className='mb-3'>
									<label htmlFor='tag' className='col-form-label'>
										Tags:
									</label>
									<input
										type='text'
										className='form-control'
										id='tag'
										name='tag'
										onChange={onChange}
									/>
								</div>
							</form>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Close
							</button>
							<button
								type='button'
								className='btn btn-primary'
								data-bs-dismiss='modal'
								onClick={handleSaveClick}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default NewNote;
