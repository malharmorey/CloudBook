const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1/cloudBook';

const connectToMongo = () => {
	mongoose.connect(mongoURI, () => {
		console.log('Successfully connected to mongoDB');
	});
};

module.exports = connectToMongo;
