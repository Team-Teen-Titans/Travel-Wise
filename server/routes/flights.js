const express = require('express');
const flightsController = require('../controllers/flightsController');
const router = express.Router();

router.get('/',
  flightsController.getFlights,
  (req, res) => {
    return res.status(200);
  });

module.exports = router;