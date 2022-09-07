const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//---------------------------------ROUTE 1---------------------------------
// fetching all notes of a user : get "api/notes/getallnotes".Login required
router.get('/getallnotes', fetchuser, async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user.id });
		res.json(notes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal server error');
	}
});

//---------------------------------ROUTE 2---------------------------------
// Adding note of a user : get "api/notes/addnote".Login required
router.post(
	'/addnote',
	fetchuser,
	[
		// Validating the input from user
		body('title')
			.isLength({
				min: 3,
			})
			.withMessage('Title should contain atleast 3 characters'),
		body('description')
			.exists({ checkFalsy: true })
			.withMessage('Description can not be blank'),
		// TODO: eliminate null string
	],
	async (req, res) => {
		try {
			const { title, description, tag } = req.body;

			// Returning bad request and error in case of any error
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			// Creating a new note
			const note = new Note({
				title,
				description,
				tag,
				user: req.user.id,
			});
			await note.save();
			res.json(note);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Internal server error');
		}
	}
);

//---------------------------------ROUTE 3---------------------------------
// Updating an existing note of a user : get "api/notes/updatenote".Login required
router.put(
	'/updatenote/:id',
	fetchuser,
	[
		// Validating the input from user
		body('title')
			.isLength({
				min: 3,
			})
			.withMessage('Title should contain atleast 3 characters'),
		body('description')
			.exists({ checkFalsy: true })
			.withMessage('Description can not be blank'),
		// TODO: eliminate null string
	],
	async (req, res) => {
		const { title, description, tag } = req.body;

		// Creating a new note object
		const newNote = {};
		if (title) {
			newNote.title = title;
		}
		if (description) {
			newNote.description = description;
		}
		if (tag) {
			newNote.tag = tag;
		}

		// Finding the note to be updated
		let note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).send('Note not found');
		}
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send('Unauthorized user');
		}

		// Updating note
		note = await Note.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true }
		);
		res.json({ note });
	}
);
module.exports = router;
