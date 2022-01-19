
const express = require('express');
const flightsController = require('../controllers/flightsController');
const router = express.Router();

router.get('/flight-info',
  flightsController.getFlights,
  (req, res) => {
    return res.status(200);
  });

router.get('/airport/:city',
  flightsController.getAirport,
  (req, res) => {
    console.log(res.locals.airportCodes);
    return res.status(200).send(res.locals.airportCodes);
  });

module.exports = router;