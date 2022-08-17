const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const logger = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const uploads = multer({ dest: 'uploads/' });
const app = express();
app.use(logger('dev'));

// urlencoded is a built-in middleware function in express, it parses incoming requests with url encoded payloads and is based on body parser.
app.use(express.urlencoded());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// json() is a built-in middleware function in Express. This method is used to parse the incoming requests with JSON payloads and is based upon the body parser.
app.use(express.json());

//static folder available
app.use('/uploads', express.static('uploads'));

// Mongodb database connection
const db = require('./config/mongoose');

// CORS Enabling
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // 'https://www.google.com' it can be any domain
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With,Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
		return res.status(200).json({});
	}
	next();
});

// Routes which should handle requests
app.use('/', require('./routes/index.js'));

// Server listening on defined Port
app.listen(PORT, (err) => {
	if (err) {
		console.log('Error in running server!', err);
		return;
	}
	console.log(`Express server is running fine on Port : ${PORT}`);
	return;
});
