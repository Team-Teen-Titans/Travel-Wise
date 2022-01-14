const fs = require('fs');
const path = require('path');

const flightsController = {};

flightsController.getFlights = (req, res, next) => {
  console.log('getting flights');
  return next();
};

module.exports = flightsController;