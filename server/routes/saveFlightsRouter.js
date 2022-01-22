const express = require('express');
const router = express.Router();
const {
	getSavedFlights,
	saveFlights,
	deleteFlights,
} = require('../controllers/savedFlightsController');
const {
	checkAuthenticated,
	checkNotAuthenticated,
} = require('../controllers/sessionController');

router.get(
	'/get-saved-flights',
	checkAuthenticated,
	getSavedFlights,
	(req, res) => {
		return res.status(200).send(res.locals.savedFlights);
	}
);

router.post('/save-flights', checkAuthenticated, saveFlights, (req, res) => {
	return res.status(200).send('Your flight has been saved.');
});

router.delete(
	'/delete-saved-flights',
	checkAuthenticated,
	deleteFlights,
	(req, res) => {
		return res.status(200).send('Your flight has been deleted.');
	}
);

module.exports = router;
