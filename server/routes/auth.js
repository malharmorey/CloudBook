const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//creating a user using : POST "api/auth/createUser". No login required
router.post(
	'/createUser',
	[
		//Validating the input from user
		body('name')
			.isLength({
				min: 4,
			})
			.withMessage('Name should contain atleast 4 characters'),
		body('email', 'Enter a valid email').isEmail(),
		body('password')
			.isLength({
				min: 8,
			})
			.withMessage('Password lenght must be minimum 8 characters')
			.isStrongPassword()
			.withMessage(
				'Password must contain atleast 1 lowerCase, 1 upperCase, 1 number and 1 symbol '
			),
	],
	async (req, res) => {
		// Returning bad request and error in case of any error
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//Checking if user with same email already exist
		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res
					.status(400)
					.json({ error: 'Email already in use, Please use different Email' });
			}
			//Creating a new user
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			});
			res.json(user);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Oops! some error occured');
		}
	}
);

module.exports = router;
