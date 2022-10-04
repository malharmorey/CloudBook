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
		const fetchedNotes = await response.json();
		setNotes(fetchedNotes.notes);
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

		// Client-side logic to add a note
		const addedNote = await response.json();
		setNotes(notes.concat(addedNote.note));
	};

	// EDIT note
	const editNote = async (id, title, description, tag) => {
		// API call to server
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxODFlZGVkZDQzYzU0YWI4NWRjNjIzIn0sImlhdCI6MTY2MjUzMDEyN30.sEtjqQkIO0iQefwBewcm4uAjaSNhGAQRTeZ0LXQkNlY',
			},
			body: JSON.stringify({ title, description, tag }),
		});
		// eslint-disable-next-line
		const serverResponse = await response.json();

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

	// DELETE note
	const deleteNote = async (id) => {
		// API call to server
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxODFlZGVkZDQzYzU0YWI4NWRjNjIzIn0sImlhdCI6MTY2MjUzMDEyN30.sEtjqQkIO0iQefwBewcm4uAjaSNhGAQRTeZ0LXQkNlY',
			},
		});

		// eslint-disable-next-line
		const serverResponse = await response.json();

		// Client-side logic to delete a note
		let newNotesArray = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotesArray);
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
