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
		//Validating the input from user
		body('title')
			.isLength({
				min: 3,
			})
			.withMessage('Title should contain atleast 3 characters'),
		body('description')
			.exists({ checkFalsy: true })
			.withMessage('Description can not be blank'),
	],
	async (req, res) => {
		try {
			const { title, description, tag } = req.body;

			// Returning bad request and error in case of any error
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			//Creating a new note
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

module.exports = router;
