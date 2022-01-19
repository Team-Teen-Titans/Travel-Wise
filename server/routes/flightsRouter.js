const express = require("express");
const flightsController = require("../controllers/flightsController");
const router = express.Router();

//listens for a query for the IATA airport code (from the API) based on the search city. Returns IATA code.
router.get("/airport/:city", flightsController.getAirport, (req, res) => {
  console.log(res.locals.airportCodes);
  return res.status(200).send(res.locals.airportCodes);
});

//listens for a post request to 'flight info' to ping the api and search for flights with the search paramters
//returns an array of flight objects
router.post("/flight-info", flightsController.getFlights, (req, res) => {
  // console.log(
  //   res.locals.flightsData,
  //   "flightsData in router right before sending response"
  // );
  return res.status(200).send(res.locals.flightsData);
});

module.exports = router;
