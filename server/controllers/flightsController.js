const axios = require("axios");
const flightKey = process.env.FLIGHT_API_KEY;

//processes large data object returned by API as response to flight search into an array of flight objects
const flightsController = {};

//checks if the query is for one-way or roundtrip, pings the API for the airport info, and runs an
//algorithm to get an array of flight objects with the data for each one to send back to the front-end
flightsController.getFlights = async (req, res, next) => {
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

  const flightApiUrlWithParams =
    oneWayOrRound === "roundtrip"
      ? `https://api.flightapi.io/roundtrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${returnDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`
      : `https://api.flightapi.io/onewaytrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`;

  try {
    const headers = {
      Connection: "keep-alive",
      "Keep-Alive": "timeout=10, max=10",
      timeout: 20000,
    };
    const { data: tripApiCall } = await axios.get(
      flightApiUrlWithParams,
      headers
    );
    if (tripApiCall.trips.length === 0) {
      // throw new Error("Trips property is an empty array.");
      res.locals.flightsData = false;
      return next();
    }
    console.log("url", flightApiUrlWithParams);
    // console.log("running processing algo");
    const flightList = [];
    for (let i = 0; i < 220; i++) {
      if (tripApiCall.trips[i] === undefined) {
        i = 220;
        break;
      }
      const flight = {
        id: tripApiCall.trips[i].id,
        code: tripApiCall.trips[i].code,
        legIdOne: tripApiCall.trips[i].legIds[0],
        legIdTwo:
          oneWayOrRound === "roundtrip" ? tripApiCall.trips[i].legIds[1] : null,
        total: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(+tripApiCall.fares[i].price.totalAmountUsd),
        remainingSeatsCount: tripApiCall.fares[i].remainingSeatsCount,
        refundable: tripApiCall.fares[i].refundable,
        exchangeable: tripApiCall.fares[i].exchangeable,
        handoffUrl: tripApiCall.fares[i].handoffUrl,
      };

      // console.log(flight, "flight before api.legs mapping");
      tripApiCall.legs.forEach((leg) => {
        if (leg.id === flight.legIdOne) {
          flight.legOneInfo = leg;
        }
        if (leg.id === flight.legIdTwo) {
          flight.legTwoInfo = leg;
        }
      });

      //sets value to false if no leg two
      if (!Object.hasOwnProperty.call(flight, "legTwoInfo"))
        flight.legTwoInfo = false;

      flightList.push(flight);
    }
    res.locals.flightsData = flightList;
    return next();
    //-----------------------------------------------------------------------------------------------------------------------------------------------------
  } catch (err) {
    console.log("setting flightsData to false", err);
    res.locals.flightsData = false;
    return next();
  }
};

//takes in the airport name from the front-end and returns the IATA airport code from the API
flightsController.getAirport = (req, res, next) => {
  const { city } = req.params;
  axios
    .get(`https://api.flightapi.io/iata/${flightKey}/${city}/airport`)
    .then(({ data }) => {
      // console.log('resp in getAirport func:',data)
      const airportCodes = [];
      data.data.forEach((airport) => {
        if (airport.iata) {
          airportCodes.push(airport.iata);
        }
      });
      res.locals.airportCodes = airportCodes;
      // console.log('airportCodes:', airportCodes);
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
