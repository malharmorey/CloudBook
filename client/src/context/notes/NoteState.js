import NoteContext from './NoteContext';
import { useState } from 'react';
const NoteState = (props) => {
	const notesInitial = [
		{
			_id: '363185b09876e88cffbf4b396d',
			user: '63181ededd43c54ab85dc623',
			title: 'My Title',
			description:
				'my first note description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quo molestiae delectus natus iste laboriosam expedita porro, architecto quas quos! ',
			tag: 'personal',
			date: '2022-09-07T08:49:13.426Z',
			__v: 0,
		},
		{
			_id: '5631872c127dccff92d27751d3',
			user: '63181ededd43c54ab85dc623',
			title: 'My titlte two ',
			description:
				'I m glad that you are reading my desc so carefully UwU Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quo molestiae delectus natus iste laboriosam expedita porro, architecto quas quos! ',
			tag: 'work',
			date: '2022-09-07T10:30:25.312Z',
			__v: 0,
		},
		{
			_id: '76318737b8d8f8dac6b09d371b',
			user: '63181ededd43c54ab85dc623',
			title: 'My title three UwU',
			description:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quo molestiae delectus natus iste laboriosam expedita porro, architecto quas quos! ',
			tag: 'home',
			date: '2022-09-07T10:33:31.426Z',
			__v: 0,
		},
	];
	const [notes, setNotes] = useState(notesInitial);

	// Add note
	const addNote = (title, description, tag) => {
		// TODO: API call
		const note = {
			_id: '73318737b8d8f8fac6b09d371b5',
			user: '63181ededd43c54ab85dc623',
			title: title,
			description: description,
			tag: tag,
			date: '2022-08-07T11:33:31.426Z',
			__v: 0,
		};
		setNotes(notes.concat(note));
	};

	//Delete note
	const deleteNote = (id) => {
		// TODO: API call
		const newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
	};

	//Edit note
	const editNote = (id, title, description, tag) => {};

	return (
		<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
