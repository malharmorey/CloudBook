import NoteContext from './NoteContext';
import { useState } from 'react';
const NoteState = (props) => {
	const host = 'http://192.168.1.2:8000';
	const [notes, setNotes] = useState([]);
	const [userName, setUserName] = useState();

	// GET All notes
	const getAllNotes = async () => {
		// API call to server
		const response = await fetch(`${host}/api/notes/getallnotes`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': localStorage.getItem('token'),
			},
		});
		const fetchedNotes = await response.json();
		setNotes(fetchedNotes.notes);
		setUserName(fetchedNotes.userName);
		if (fetchedNotes.success !== true) {
			props.showAlert(`${fetchedNotes.message}`, 'danger');
		}
	};

	// ADD note
	const addNote = async (title, description, tag) => {
		// API call to server
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({ title, description, tag }),
		});

		// Client-side logic to add a note
		const addedNote = await response.json();
		setNotes(notes.concat(addedNote.note));
		// Alerts
		if (addedNote.success) {
			props.showAlert(`${addedNote.message}`, 'success');
		} else {
			addedNote.message === undefined
				? props.showAlert(`Oops unable to add your note`, 'warning')
				: props.showAlert(`${addedNote.message}`, 'danger');
		}
	};

	// EDIT note
	const editNote = async (id, title, description, tag) => {
		// API call to server
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({ title, description, tag }),
		});
		// eslint-disable-next-line
		const serverResponse = await response.json();
		// Alerts
		if (serverResponse.success) {
			props.showAlert(`${serverResponse.message}`, 'success');
		} else {
			serverResponse.message === undefined
				? props.showAlert(`Oops unable to update your note`, 'warning')
				: props.showAlert(`${serverResponse.message}`, 'danger');
		}

		// Client-side logic to edit a note
		let newNotes = JSON.parse(JSON.stringify(notes));
		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				newNotes[index].date = serverResponse.date;
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
				'auth-token': localStorage.getItem('token'),
			},
		});

		// eslint-disable-next-line
		const serverResponse = await response.json();
		// Alerts
		if (serverResponse.success) {
			props.showAlert(`${serverResponse.message}`, 'danger');
		} else {
			serverResponse.message === undefined
				? props.showAlert(`Oops unable to delete your note`, 'warning')
				: props.showAlert(`${serverResponse.message}`, 'danger');
		}

		// Client-side logic to delete a note
		let newNotesArray = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotesArray);
	};

	// Clearing user notes on client side
	const clearUserNotesArray = () => {
		setNotes([]);
	};

	// Reversing user notes array to display new note at the top.
	var reversedNotesArray = [...notes].reverse();
	return (
		<NoteContext.Provider
			value={{
				userName,
				reversedNotesArray,
				getAllNotes,
				addNote,
				deleteNote,
				editNote,
				clearUserNotesArray,
			}}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
