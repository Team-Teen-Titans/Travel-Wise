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
      const airportCodes = [];
      apiInfo.data.map((data) => {
        if (data.iata.length > 0){
          airportCodes.push(data.iata);
        }
      });
      res.locals.airportCodes = airportCodes;
      console.log(res.locals.airportCodes);
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