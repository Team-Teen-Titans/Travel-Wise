import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { flightKey } from "../utils/constants";
import axios from "axios";
import "regenerator-runtime";

const FlightSelector = () => {
  //this is the trip info state that will be set by the inputs and eventually
  //passed into the next component to query the API
  const [tripInfo, setTripInfo] = useState({
    originAirport: null,
    destinationAirport: null,
    departureDate: null,
    returnDate: null,
    oneWayOrRound: null,
  });

  useEffect(() => {
    console.log(tripInfo);
  });

  const navigate = useNavigate();

  //this triggers the submitting of the trip choices and routing to the next component
  //where flight options will be displayed
  const handleSearchSubmit = () => {
    console.log(tripInfo);
    const originCode = getAirportCode(tripInfo.originAirport);
    const destinationCode = getAirportCode(tripInfo.destinationAirport);
    navigate("/flights", {
      state: {
        tripInfo: {
          ...tripInfo,
          originAirport: originCode,
          destinationAirport: destinationCode,
        },
      },
    });
  };

  //this gets the airport code input so that state can be set by airport code and not by
  //city name so the query will run successfully
  const getAirportCode = async (cityName) => {
    let cityUrl = cityName.replace(/\s/g, "%20");
    console.log(cityUrl);
    let airportCode;
    await axios
      .request({
        method: "GET",
        url: `https://api.flightapi.io/iata/${flightKey}/${cityUrl}/airport`,
        //left off here getting CORS error trying to send http req from front-end
        // headers: {},
      })
      .then((res) => (airportCode = res.data[0].iata))
      .catch((err) => console.error(err));
    return airportCode;
  };

  //sets the tripInfo state based on changes to the inputs
  const handleChange = (type) => (e) => {
    switch (type) {
      case "onewaytrip":
        setTripInfo({ ...tripInfo, oneWayOrRound: type });
        break;
      case "roundtrip":
        setTripInfo({ ...tripInfo, oneWayOrRound: type });
        break;
      case "originAirport":
        setTripInfo({ ...tripInfo, originAirport: e.target.value });
        break;
      case "destinationAirport":
        setTripInfo({ ...tripInfo, destinationAirport: e.target.value });
        break;
      case "departureDate":
        setTripInfo({ ...tripInfo, departureDate: e.target.value });
        break;
      case "returnDate":
        setTripInfo({ ...tripInfo, returnDate: e.target.value });
        break;
      default:
        console.log("handleChange ran", type);
    }
  };

  //sets minimum departure date to today
  const minDate = new Date().toLocaleDateString("en-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  //sets minimum return date to today+1
  const findRoundTripMinDate = (date) => {
    const minDate = date.split("");
    let changeDay = +minDate[minDate.length - 1] + 1;
    minDate[minDate.length - 1] = changeDay;
    console.log(minDate.join(""));
    return minDate.join("");
  };

  //need to get the first airport code for each city to pass as state to next component
  //need to render extra set of date for round trip and set that state
  return (
    <div className="place-center">
      <h3>Type of trip?</h3>
      <span>
        <button
          onClick={handleChange("onewaytrip")}
          className="border 1px rounded"
          id="one-way"
        >
          one way
        </button>
        {" or "}
        <button
          onClick={handleChange("roundtrip")}
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
        <input
          type="date"
          name="departure"
          className="border 1px rounded"
          min={minDate}
          onChange={handleChange("departureDate")}
        ></input>
        {"  "}
        <label for="return-date">Return Date: </label>
        <input
          type="date"
          name="return"
          className="border 1px rounded"
          min={findRoundTripMinDate(minDate)}
          onChange={handleChange("returnDate")}
        ></input>
      </span>
      <br />
      <br />
      <span>
        <label for="origin-city">From City: </label>
        <input
          for="origin"
          name="origin"
          className="border 1px rounded"
          onChange={handleChange("originAirport")}
        ></input>
        {"  "}
        <label for="destination-city">Destination: </label>
        <input
          for="destination"
          name="destination"
          className="border 1px rounded"
          onChange={handleChange("destinationAirport")}
        ></input>
      </span>

      <br />
      <br />
      <button onClick={handleSearchSubmit} className="border 1px rounded">
        Search Flights Now
      </button>
    </div>
  );
};

export default FlightSelector;
