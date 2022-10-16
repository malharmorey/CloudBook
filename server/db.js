const mongoose = require('mongoose');
const mongoURI = `mongodb+srv://Moreynium:${process.env.MONGO_PASSWORD}@moreynium.4ggiqdc.mongodb.net/CloudBook?retryWrites=true&w=majority`;
// after using the mongo pass from .env to login to atlas shwoing Auth error.

const connectToMongo = () => {
	mongoose
		.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('Successfully connected to mongoDB');
		})
		.catch((err) => console.log(err));
};

module.exports = connectToMongo;
