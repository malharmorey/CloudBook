var jwt = require('jsonwebtoken');

const JWT_SECRET = `${process.env.JWT_SECRET_KEY}`;

// Fetching userId from auth-token send by user
const fetchuser = (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) {
		return res.status(401).send({ errors: 'Invalid Token' });
	}

	try {
		// Authenticating auth-token and fetching userId from it
		jwt.verify(token, JWT_SECRET, (err, userData) => {
			if (err)
				return res.status(401).send({
					errors: 'User is not authenticated to perform this task',
				});
			req.user = userData.user;
			next();
		});
	} catch (error) {
		res.status(403).send({ errors: 'Invalid user' });
	}
};

module.exports = fetchuser;
