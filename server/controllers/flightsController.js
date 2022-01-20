const axios = require("axios");
const flightKey = process.env.FLIGHT_API_KEY;

//processes large data object returned by API as response to flight search into an array of flight objects
const flightsController = {};

//checks if the query is for one-way or roundtrip, pings the API for the airport info, and runs the
//algorithm above to get an array of flight objects with the data for each one to send back to the front-end
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
  
  const flightApiUrlWithParams = oneWayOrRound === 'roundtrip' ? 
  `https://api.flightapi.io/roundtrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${returnDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`
  :
  `https://api.flightapi.io/onewaytrip/${flightKey}/${originAirport}/${destinationAirport}/${departureDate}/${numOfAdults}/${numOfChildren}/${numOfInfants}/${cabinClass}/USD`;
  
  try {
    console.log('do i enter here?')
    const headers = {
      Connection: 'keep-alive',
      'Keep-Alive': 'timeout=10000, max=100'
    }
    const {data: tripApiCall} = await axios.get(flightApiUrlWithParams, headers);
    if (tripApiCall.trips.length === 0) {
      throw new Error('Trips property is an empty array.');
    }
    console.log('url',flightApiUrlWithParams)
    console.log('api call in trips prop:',tripApiCall.trips)
    //-----------------------------------------------------------------------------------------------------------------------------------------------------
    console.log("running processing algo");
    const flightList = [];
    // let i = 0;
    for (let i = 0; i < 5; i++) {
      // while (i < 30 && api.trips[i].id !== undefined) {
      // console.log("inside while loop");
      const flight = {
        id:                   tripApiCall.trips[i].id,
        code:                 tripApiCall.trips[i].code,
        legIdOne:             tripApiCall.trips[i].legIds[0],
        total:                tripApiCall.fares[i].price.totalAmountUsd,
        remainingSeatsCount:  tripApiCall.fares[i].remainingSeatsCount,
        refundable:           tripApiCall.fares[i].refundable,
        exchangeable:         tripApiCall.fares[i].exchangeable,
        handoffUrl:           tripApiCall.fares[i].handoffUrl,
        legIdTwo:             oneWayOrRound === "roundtrip" ? tripApiCall.trips[i].legIds[1] : null,
      };
  
      // console.log(flight, "flight before api.legs mapping");
      tripApiCall.legs.forEach((leg) => {
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
    }
    console.log('flightList',flightList)
    res.locals.flightsData = flightList;
    return next();
    //-----------------------------------------------------------------------------------------------------------------------------------------------------

    
  } catch (err) {
    // console.error('error from getFlights function in flightsController:',err.response )
    console.log('setting flightsData to false', err)
    res.locals.flightsData = false;
    return next();
  }
};

//The recursive function needs to return the axios invocation which handles the data and returns next so everything
//makes it back up the stack. The recursive function should be invoked for the first time, if and only if the flightInfo is empty.
//However, if we have no flights available, if we have a counter parameter, we could increment it on each call.

//we also need to error handle so if the res.locals key is empty in the router, it sends back a useful response to front-end

//takes in the airport name from the front-end and returns the IATA airport code from the API
flightsController.getAirport = (req, res, next) => {
  const { city } = req.params;
  axios.get(`https://api.flightapi.io/iata/${flightKey}/${city}/airport`)
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
