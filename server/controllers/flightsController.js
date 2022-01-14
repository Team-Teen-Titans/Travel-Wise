const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();


const flightKey = process.env.FLIGHT_API_KEY;

const flightsController = {};

flightsController.getFlights = (req, res, next) => {
  console.log('getting flights');
  return next();
};

flightsController.getAirport = (req, res, next) => {
  const {city} = req.params;
  axios
    .request({
      method: 'GET',
      url: `https://api.flightapi.io/iata/${flightKey}/${city}/airport`
    })
    .then((response) => response.data)
    .then((apiInfo) => {
      res.locals.airportCode = apiInfo.data[0].iata;
      console.log(res.locals.airportCode);
      return next();
    })
    .catch(err => {
      return next({
        log: 'error querying API for airport code',
        message: {err}
      });
    });
};

module.exports = flightsController;