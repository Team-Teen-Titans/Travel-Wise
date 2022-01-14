const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = 3000;

app.use(cors());

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
app.use('/api/flights', flightsRouter);
app.use('/user', userRouter);

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
