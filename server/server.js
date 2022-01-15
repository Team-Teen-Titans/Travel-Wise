const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
// const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const PORT = 3000;
require('dotenv').config();
require('./google-oauth');

app.use(cors());
app.use(cookieParser());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
/**
 * require routers
 */

const flightsRouter = require('./routes/flights');
const userRouter = require('./routes/userRouter');

/**
 * handle parsing request body
 */
app.use(express.json());
//handle flights query

// app.get('/google/callback', (req, res) => res.status(200).send('google oauth'))
app.use('/api/flights', flightsRouter);
app.use('/api/user', userRouter);

// catch-all route handler for any requests to an unknown route
// set status code and send status as a string in response
app.use((req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An error occurred' },
	};
	// change error of default error object
	const errorObj = {
		...defaultErr,
		message: err.message,
	};
	return res.status(errorObj.status).json(errorObj.message);
});

//handle page not found
app.use((req, res) =>
	res.status(404).send("This is not the page you're looking for...")
);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
