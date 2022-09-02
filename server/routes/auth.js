const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//creating a user using : POST "api/auth/"
router.post(
	'/',
	[
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
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		})
			.then((user) => res.json(user))
			.catch((err) => {
				console.log(err);
				res.json({
					error: 'Email already in use, Please use different Email',
					message: err.message,
				});
			});
	}
);

module.exports = router;
