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
		await fetch(`${host}/api/notes/addnote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxODFlZGVkZDQzYzU0YWI4NWRjNjIzIn0sImlhdCI6MTY2MjUzMDEyN30.sEtjqQkIO0iQefwBewcm4uAjaSNhGAQRTeZ0LXQkNlY',
			},
			body: JSON.stringify({ title, description, tag }),
		});

		// Client-side logic to add a note
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

	// DELETE note
	const deleteNote = async (id) => {
		// API call to server
		await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxODFlZGVkZDQzYzU0YWI4NWRjNjIzIn0sImlhdCI6MTY2MjUzMDEyN30.sEtjqQkIO0iQefwBewcm4uAjaSNhGAQRTeZ0LXQkNlY',
			},
		});

		// Client-side logic to delete a note
		let newNotesArray = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotesArray);
	};

	// EDIT note
	const editNote = async (id, title, description, tag) => {
		// API call to server
		await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxODFlZGVkZDQzYzU0YWI4NWRjNjIzIn0sImlhdCI6MTY2MjUzMDEyN30.sEtjqQkIO0iQefwBewcm4uAjaSNhGAQRTeZ0LXQkNlY',
			},
			body: JSON.stringify({ title, description, tag }),
		});

		// Client-side logic to edit a note
		let newNotes = JSON.parse(JSON.stringify(notes));
		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
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
