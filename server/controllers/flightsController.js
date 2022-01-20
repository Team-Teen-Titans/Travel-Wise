const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const flightKey = process.env.FLIGHT_API_KEY;

//processes large data object returned by API as response to flight search into an array of flight objects
const getFlightsList = (api, isRound) => {
  console.log("running processing algo");
  const flightList = [];
  let i = 0;
  // console.log(api.trips[i], "api.trips[0]");
  // console.log(api.fares[i], "api.fares[0]");
  // console.log(
  //   "api.trips[i].id: ",
  //   api.trips[i].id,
  //   "api.trips[i].code: ",
  //   api.trips[i].code,
  //   "api.trips[i].legIds[0]: ",
  //   api.trips[i].legIds[0],
  //   "api.fares[i].price.totalAmountUsd: ",
  //   api.fares[i].price.totalAmountUsd,
  //   "api.fares[i].remainingSeatsCount: ",
  //   api.fares[i].remainingSeatsCount,
  //   "api.fares[i].refundable: ",
  //   api.fares[i].refundable,
  //   "api.fares[i].exchangeable: ",
  //   api.fares[i].exchangeable,
  //   "api.fares[i].handoffUrl: ",
  //   api.fares[i].handoffUrl
  // );

  while (i < 30) {
    // while (i < 30 && api.trips[i].id !== undefined) {
    // console.log("inside while loop");
    const flight = {};
    flight.id = api.trips[i].id;
    flight.code = api.trips[i].code;
    flight.legIdOne = api.trips[i].legIds[0];
    flight.total = api.fares[i].price.totalAmountUsd;
    flight.remainingSeatsCount = api.fares[i].remainingSeatsCount;
    flight.refundable = api.fares[i].refundable;
    flight.exchangeable = api.fares[i].exchangeable;
    flight.handoffUrl = api.fares[i].handoffUrl;

    if (isRound === "roundtrip") flight.legIdTwo = api.trips[i].legIds[1];

    // console.log(flight, "flight before api.legs mapping");
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
      } else if (flight.legIdTwo) {
        if (leg.id === flight.legIdTwo) {
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
      }
    });

    flightList.push(flight);
    i++;
  }
  return flightList;
};

async function axiosApiCall(body, counter = 0) {
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
  } = body;
  console.log(originAirport, destinationAirport);
  let url = "";
  if (oneWayOrRound === "roundtrip") {
    url = `https://api.flightapi.io/roundtrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${returnDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`;
  } else {
    url = `https://api.flightapi.io/onewaytrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`;
  }
  if (counter > 3) {
    return "no trips";
  }

  try {
    const resp = await axios.get(url);
    console.log("resp.data:", resp.data);
    if (resp.data.trips.length === 0) {
      return await axiosApiCall(++counter);
    }
    return getFlightsList(resp.data, oneWayOrRound);
  } catch (err) {
    // console.error(err);
    // return next({
    //   log: "error querying API for flights info",
    //   message: {
    //     err: `this was the error caught in get flights call: ${err}`,
    //   },
    // });
  }
}

const flightsController = {};

//checks if the query is for one-way or roundtrip, pings the API for the airport info, and runs the
//algorithm above to get an array of flight objects with the data for each one to send back to the front-end
flightsController.getFlights = async (req, res, next) => {
  // const {
  //   originAirport,
  //   destinationAirport,
  //   departureDate,
  //   returnDate,
  //   oneWayOrRound,
  //   numOfAdults,
  //   numOfChildren,
  //   numOfInfants,
  //   cabinClass,
  // } = req.body;
  // console.log(req.body);
  const blah = await axiosApiCall(req.body);
  // console.log("blah:", blah);
  res.locals.flightsData = blah;
  return next();
  // if (oneWayOrRound === "onewaytrip") {
  //   return axios
  //     .get(
  //       `https://api.flightapi.io/onewaytrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`
  //     )
  //     .then((flightInfo) => {
  //       console.log("inside thenable");
  //       res.locals.flightsData = getFlightsList(flightInfo.data, false);
  //       console.log("flightsData assigned on res.locals");
  //       return next();
  //     })
  //     .catch((err) => {
  //       return next({
  //         log: "error querying API for flights info",
  //         message: {
  //           err: `this was the error caught in get flights call: ${err}`,
  //         },
  //       });
  //     });
  // } else if (oneWayOrRound === "roundtrip") {
  //   console.log("running roundtrip");
  //   return axios
  //     .get(
  //       `https://api.flightapi.io/roundtrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${returnDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`
  //     )
  //     .then((flightInfo) => {
  //       if (flightInfo.data.trips[0] === undefined) something;
  //       console.log("running thenable");
  //       // console.log(Object.keys(flightInfo.data), "keys of flightInfo object");
  //       res.locals.flightsData = getFlightsList(flightInfo.data, true);
  //       return next();
  //     })
  //     .catch((err) => {
  //       return next({
  //         log: "error querying API for flights info",
  //         message: {
  //           err: `this was the error caught in get flights call: ${err}`,
  //         },
  //       });
  //     });
  // }
};

//The recursive function needs to return the axios invocation which handles the data and returns next so everything
//makes it back up the stack. The recursive function should be invoked for the first time, if and only if the flightInfo is empty.
//However, if we have no flights available, if we have a counter parameter, we could increment it on each call.

//we also need to error handle so if the res.locals key is empty in the router, it sends back a useful response to front-end

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
      const airportCodes = [];
      apiInfo.data.map((data) => {
        if (data.iata.length > 0) {
          airportCodes.push(data.iata);
        }
      });
      res.locals.airportCodes = airportCodes;
      console.log(res.locals.airportCodes);
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

// const apiCallRound = (counter = 0, isRound) => {
//   counter++;
//   console.log(`apiCallRound call number:`, counter);
//   if (counter > 4)
//     return `no flights available from ${originAirport} to ${destinationAirport}`;

//   //this case is for roundtrip only because the axios query is different
//   if (isRound === "roundtrip") {
//     return axios
//       .get(
//         `https://api.flightapi.io/roundtrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${returnDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`
//       )
//       .then((flightInfo) => {
//         if (flightInfo.data.trips[0] === undefined)
//           return apiCallRound(counter, isRound);
//         console.log("running thenable");
//         // console.log(Object.keys(flightInfo.data), "keys of flightInfo object");
//         res.locals.flightsData = getFlightsList(flightInfo.data, true);
//         return next();
//       })
//       .catch((err) => {
//         return next({
//           log: "error querying API for flights info",
//           message: {
//             err: `this was the error caught in get flights call: ${err}`,
//           },
//         });
//       });
//   }

//   //this case is for oneway only
//   else {
//     console.log('running oneway code block')
//     return axios
//       .get(
//         `https://api.flightapi.io/onewaytrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`
//       )
//       .then((flightInfo) => {
//         if (flightInfo.data.trips[0] === undefined)
//           return apiCallRound(counter, isRound);
//         console.log("inside thenable");
//         res.locals.flightsData = getFlightsList(flightInfo.data, false);
//         console.log("flightsData assigned on res.locals");
//         return next();
//       })
//       .catch((err) => {
//         return next({
//           log: "error querying API for flights info",
//           message: {
//             err: `this was the error caught in get flights call: ${err}`,
//           },
//         });
//       });
//   }
// };

// return apiCallRound(0, oneWayOrRound);
