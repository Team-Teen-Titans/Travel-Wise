const express = require('express');
const app = express();
const session = require('express-session');
// const cookieSession = require('cookie-session');
const cors = require('cors');
// const path = require('path');
const passport = require('passport');
const PORT = 3000;
require('dotenv').config();
require('./passport-config')(passport);

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.use(cookieSession({
// 	maxAge: 1000 * 60,
// 	keys: ['stealthy-cat']
// }))
app.use(
	session({
		secret: 'stealthy-cat',
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 3600000 }, //this is 1 hour
	})
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * require routers
 */

const flightsRouter = require('./routes/flightsRouter');
const userRouter = require('./routes/userRouter');
const saveFlightsRouter = require('./routes/saveFlightsRouter');

/**
 * handle parsing request body
 */
app.use(express.json());
//handle flights query

app.use('/api/flights', flightsRouter);
app.use('/api/user', userRouter);
app.use('/api/saved-flights', saveFlightsRouter);

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
