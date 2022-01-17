const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const flightKey = process.env.FLIGHT_API_KEY;

const flightsController = {};

flightsController.getFlights = (req, res, next) => {
  const {
    originAirport,
    destinationAirport,
    departureDate,
    returnDate,
    oneWayOrRound,
    numOfAdults,
    numOfChildren,
    numOfInfants,
    cabinClass,
  } = req.body;

  if (oneWayOrRound === "onewaytrip") {
    console.log("inside onewaytrip");

    return axios
      .get(
        `https://api.flightapi.io/onewaytrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`
      )
      .then((flightInfo) => {
        res.locals.flightsData = flightInfo;
        console.log(res.locals.flightsData);
        return next();
      })
      .catch((err) => {
        return next({
          log: "error querying API for flights info",
          message: { err },
        });
      });
  } else if (oneWayOrRound === "roundtrip") {
    console.log("inside roundtrip");

    return axios
      .get(
        `https://api.flightapi.io/roundtrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${returnDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`
      )
      .then((flightInfo) => {
        console.log("inside thenable");
        res.locals.flightsData = flightInfo;
        console.log(res.locals.flightsData, "flightInfo");
        return next();
      })
      .catch((err) => {
        return next({
          log: "error querying API for flights info",
          message: { err },
        });
      });
  }
};

flightsController.getAirport = (req, res, next) => {
  const { city } = req.params;
  axios
    .request({
      method: "GET",
      url: `https://api.flightapi.io/iata/${flightKey}/${city}/airport`,
    })
    .then((response) => response.data)
    .then((apiInfo) => {
      res.locals.airportCode = apiInfo.data[0].iata;
      console.log(res.locals.airportCode);
      return next();
    })
    .catch((err) => {
      return next({
        log: "error querying API for airport code",
        message: { err },
      });
    });
};

module.exports = flightsController;
