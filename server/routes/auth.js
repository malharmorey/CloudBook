const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = `${process.env.JWT_SECRET_KEY}`;

//---------------------------------ROUTE 1---------------------------------
// Creating a user using : POST "api/auth/createUser". No login required
router.post(
	'/createUser',
	[
		//Validating the input from user
		body('name')
			.isLength({
				min: 4,
			})
			.withMessage('Name should contain atleast 4 characters'),
		body('email').isEmail().withMessage('Enter a valid email'),
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
			//Hashing the new user password before storing it to our DB
			const salt = await bcrypt.genSalt(10);
			const encryptedPassword = await bcrypt.hash(req.body.password, salt);
			//Creating a new user
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: encryptedPassword,
			});
			//Sending signed Auth-Token as a response
			const data = {
				user: {
					id: user.id,
				},
			};
			const authToken = jwt.sign(data, JWT_SECRET);
			res.json({ authToken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Internal server error');
		}
	}
);

//----------------------------------ROUTE 2---------------------------------
// Authenticating a user using : POST "api/auth/login". No login required
router.post(
	'/login',
	[
		//Validating the input from user
		body('email').isEmail().withMessage('Enter a valid email'),
		body('password').exists().withMessage('Password can not be blank'),
	],
	async (req, res) => {
		// Returning bad request and error in case of any error
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({
					error: `We couldn't find an account matching the login info you entered  `,
				});
			}
			//Verifying the user password input
			const comparePassword = await bcrypt.compare(password, user.password);
			if (!comparePassword) {
				return res.status(400).json({
					error: `Incorrect password`,
				});
			}
			//Sending signed Auth-Token as a response
			const data = {
				user: {
					id: user.id,
				},
			};
			const authToken = jwt.sign(data, JWT_SECRET);
			res.json({ authToken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Internal server error');
		}
	}
);

//----------------------------------ROUTE 3---------------------------------
// Fetching a user using : POST "api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select('-password');
		res.send(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal server error');
	}
});
module.exports = router;
