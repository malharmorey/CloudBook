import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteCard from './NoteCard';
import NewNote from './NewNote';

function Notes() {
	const context = useContext(noteContext);
	const { notes } = context;
	return (
		<>
			<NewNote />
			<div className='row'>
				{notes.map((note) => {
					return (
						<div className='col-md-4' key={note._id}>
							<NoteCard
								title={note.title ? note.title : 'No title available'}
								description={
									note.description
										? note.description.slice(0, 100)
										: 'No description available'
								}
								tag={note.tag}
								date={note.date}
								id={note._id}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Notes;
