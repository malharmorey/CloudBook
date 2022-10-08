import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import NoteCard from './NoteCard';

function SetNotes(props) {
	const context = useContext(noteContext);
	const { notes, getAllNotes } = context;
	let navigate = useNavigate();

	useEffect(() => {
		localStorage.getItem('token') !== null ? getAllNotes() : navigate('/login');
	}, []); // eslint-disable-line
	return (
		<>
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
								updateNote={props.updateNote}
								note={note}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default SetNotes;
