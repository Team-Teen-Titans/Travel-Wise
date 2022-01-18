const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const flightKey = process.env.FLIGHT_API_KEY;

//processes large data object returned by API as response to flight search into an array of flight objects
const getFlightsList = (api, roundTrip = true) => {
  console.log("running processing algo");
  const flightList = [];

  let i = 0;
  while (i < 30 && api.trips[i].id !== undefined) {
    const flight = {};
    flight.id = api.trips[i].id;
    flight.code = api.trips[i].code;
    flight.legIdOne = api.trips[i].legIds[0];
    flight.total = api.fares[i].price.totalAmountUsd;
    flight.remainingSeatsCount = api.fares[i].remainingSeatsCount;
    flight.refundable = api.fares[i].refundable;
    flight.exchangeable = api.fares[i].exchangeable;
    flight.handoffUrl = api.fares[i].handoffUrl;

    if (roundTrip) flight.legIdTwo = api.trips[i].legIds[1];

    api.legs.forEach((leg) => {
      if (leg.id === flight.legIdOne) {
        const {
          duration,
          departureAirportCode,
          arrivalAirportCode,
          airlineCodes,
          stopoverAirportCodes,
          stopoversCount,
          departureDateTime,
          arrivalDateTime,
          stopoverDurationMinutes,
          durationMinutes,
          overnight,
          segments,
        } = leg;
        flight.legOneInfo = {
          duration,
          departureAirportCode,
          arrivalAirportCode,
          airlineCodes,
          stopoverAirportCodes,
          stopoversCount,
          departureDateTime,
          arrivalDateTime,
          stopoverDurationMinutes,
          durationMinutes,
          overnight,
          segments,
        };
      } else if (leg.id === flight.legIdTwo) {
        const {
          duration,
          departureAirportCode,
          arrivalAirportCode,
          airlineCodes,
          stopoverAirportCodes,
          stopoversCount,
          departureDateTime,
          arrivalDateTime,
          stopoverDurationMinutes,
          durationMinutes,
          overnight,
          segments,
        } = leg;
        flight.legTwoInfo = {
          duration,
          departureAirportCode,
          arrivalAirportCode,
          airlineCodes,
          stopoverAirportCodes,
          stopoversCount,
          departureDateTime,
          arrivalDateTime,
          stopoverDurationMinutes,
          durationMinutes,
          overnight,
          segments,
        };
      }
    });

    flightList.push(flight);
    i++;
  }
  return flightList;
};

const flightsController = {};

//checks if the query is for one-way or roundtrip, pings the API for the airport info, and runs the
//algorithm above to get an array of flight objects with the data for each one to send back to the front-end
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
  console.log(req.body);

  if (oneWayOrRound === "onewaytrip") {
    return axios
      .get(
        `https://api.flightapi.io/onewaytrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`
      )
      .then((flightInfo) => {
        res.locals.flightsData = getFlightsList(flightInfo.data, false);
        return next();
      })
      .catch((err) => {
        return next({
          log: "error querying API for flights info",
          message: {
            err: `this was the error caught in get flights call: ${err}`,
          },
        });
      });
  } else if (oneWayOrRound === "roundtrip") {
    console.log("running roundtrip");
    return axios
      .get(
        `https://api.flightapi.io/roundtrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${returnDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`
      )
      .then((flightInfo) => {
        console.log("running thenable");
        res.locals.flightsData = getFlightsList(flightInfo.data, true);
        return next();
      })
      .catch((err) => {
        return next({
          log: "error querying API for flights info",
          message: {
            err: `this was the error caught in get flights call: ${err}`,
          },
        });
      });
  }
};

//takes in the airport name from the front-end and returns the IATA airport code from the API
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
