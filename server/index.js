const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
require('dotenv').config();

connectToMongo();
const app = express();
const port = process.env.PORT || 8000;

//Middleware function
app.use(express.json());
app.use(cors());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
	res.status(200).send('Welcome to server!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
