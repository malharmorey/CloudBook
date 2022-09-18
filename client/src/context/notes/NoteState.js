import NoteContext from './NoteContext';
import { useState } from 'react';
const NoteState = (props) => {
	const host = 'http://localhost:8000';
	const notesArray = [];
	const [notes, setNotes] = useState(notesArray);

	// GET All notes
	const getAllNotes = async () => {
		// API call to server
		const response = await fetch(`${host}/api/notes/getallnotes`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxODFlZGVkZDQzYzU0YWI4NWRjNjIzIn0sImlhdCI6MTY2MjUzMDEyN30.sEtjqQkIO0iQefwBewcm4uAjaSNhGAQRTeZ0LXQkNlY',
			},
		});
		const json = await response.json();
		setNotes(json);
	};

	// ADD note
	const addNote = async (title, description, tag) => {
		// API call to server
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxODFlZGVkZDQzYzU0YWI4NWRjNjIzIn0sImlhdCI6MTY2MjUzMDEyN30.sEtjqQkIO0iQefwBewcm4uAjaSNhGAQRTeZ0LXQkNlY',
			},
			body: JSON.stringify({ title, description, tag }),
		});

		// Client-side logic
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
	const editNote = async (id, title, description, tag) => {
		// API call to server
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxODFlZGVkZDQzYzU0YWI4NWRjNjIzIn0sImlhdCI6MTY2MjUzMDEyN30.sEtjqQkIO0iQefwBewcm4uAjaSNhGAQRTeZ0LXQkNlY',
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const json = response.json();

		// Client-side logic for edti note
		for (let index = 0; index < notes.length; index++) {
			const element = notes[index];
			if (element._id === id) {
				element.title = title;
				element.description = description;
				element.tag = tag;
			}
		}
	};

	return (
		<NoteContext.Provider
			value={{ notes, getAllNotes, addNote, deleteNote, editNote }}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
