const express = require('express');
const router = express.Router();
const {
	getSavedFlights,
	saveFlights,
	deleteFlights,
} = require('../controllers/savedFlightsController');

router.get('/saved-flights', getSavedFlights, (req, res) => {
	return res.status(200).send(res.locals.savedFlights);
});

router.post('/saved-flights', saveFlights, (req, res) => {
	return res.status(200).send('Your flight has been saved.');
});

router.delete('/saved-flights', deleteFlights, (req, res) => {
	return res.status(200).send('Your flight has been deleted.');
});
