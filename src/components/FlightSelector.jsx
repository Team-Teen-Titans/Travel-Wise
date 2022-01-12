import React, { useState, useEffect } from "react";
import { flightKey, navigate } from "../utils/constants";
import axios from "axios";

const FlightSelector = () => {
  const [tripInfo, setTripInfo] = useState({
    originAirport: null,
    destinationAirport: null,
    departureDate: null,
    arrivalDate: null,
    oneWayOrRound: null,
  });

  useEffect(() => {
    console.log(tripInfo);
  });

  const handleSearch = (e) => {
    console.log(tripInfo);
    navigate("/flights", { state: { tripInfo } });
  };

  const getAirportCode = (input) => {
    axios.request();
  };

  //need to set all the state with each input type
  //need to get the first airport code for each city to pass as state to next component
  //need to render extra set of date for round trip and set that state
  return (
    <div className="place-center">
      <h3>Type of trip?</h3>
      <span>
        <button
          onClick={() =>
            setTripInfo({ ...tripInfo, oneWayOrRound: "onewaytrip" })
          }
          className="border 1px rounded"
          id="one-way"
        >
          one way
        </button>
        {" or "}
        <button
          onClick={() =>
            setTripInfo({ ...tripInfo, oneWayOrRound: "roundtrip" })
          }
          className="border 1px rounded"
          id="round-trip"
        >
          round trip
        </button>
      </span>

      <br />
      <br />

      <span>
        <label for="departure-date">Departure Date: </label>
        <input type="date"></input>
        {"  "}
        <label for="return-date">Return Date: </label>
        <input type="date"></input>
      </span>

      <span>
        <label for="origin-city">From City: </label>
        <input></input>
        {"  "}
        <label for="destination-city">Destination: </label>
        <input></input>
      </span>

      <br />
      <br />
      <button onClick={handleSearch}>Search Flights Now</button>
    </div>
  );
};

export default FlightSelector;
