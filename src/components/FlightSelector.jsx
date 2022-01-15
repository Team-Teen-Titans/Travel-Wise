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
    numOfAdults: 1,
    numOfChildren: 0,
    numOfInfants: 0,
    cabinClass: "Economy",
  });

  useEffect(() => {
    console.log(tripInfo);
  });

  const navigate = useNavigate();

  //this triggers the submitting of the trip choices and routing to the next component
  //where flight options will be displayed
  const handleSearchSubmit = () => {
    console.log(tripInfo);
    navigate('/flights', {
      state: {
        ...tripInfo,
      },
    });
  };

  //sets the tripInfo state based on changes to the inputs
  const handleChange = (type) => (e) => {
    let removedText;
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
      case "numOfAdults":
        removedText = e.target.value.replace(/\D+/g, "");
        if (removedText === "") removedText = 0;
        setTripInfo({ ...tripInfo, numOfAdults: removedText });
        break;
      case "numOfChildren":
        removedText = e.target.value.replace(/\D+/g, "");
        if (removedText === "") removedText = 0;
        setTripInfo({ ...tripInfo, numOfChildren: removedText });
        break;
      case "numOfInfants":
        removedText = e.target.value.replace(/\D+/g, "");
        if (removedText === "") removedText = 0;
        setTripInfo({ ...tripInfo, numOfInfants: removedText });
        break;
      case "cabinClass":
        setTripInfo({ ...tripInfo, cabinClass: e.target.value });
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
    const changeDay = +minDate[minDate.length - 1] + 1;
    minDate[minDate.length - 1] = changeDay;
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
        <label htmlFor="departure-date">Departure Date: </label>
        <input
          type="date"
          name="departure"
          className="border 1px rounded"
          min={minDate}
          onChange={handleChange("departureDate")}
        ></input>
        {"  "}
        <label htmlFor="return-date">Return Date: </label>
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
        <label htmlFor="origin-city">From City: </label>
        <input
          htmlFor="origin"
          name="origin"
          placeholder="Charlottesville"
          className="border 1px rounded"
          onChange={handleChange("originAirport")}
        ></input>
        {"  "}
        <label htmlFor="destination-city">Destination: </label>
        <input
          htmlFor="destination"
          placeholder="Paris"
          name="destination"
          className="border 1px rounded"
          onChange={handleChange("destinationAirport")}
        ></input>
      </span>

      <br />
      <br />
      <label htmlFor="cabinClass">Cabin Class: </label>
      <span>
        <select
          onChange={handleChange("cabinClass")}
          className="border 1px rounded"
        >
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First">First</option>
          <option value="Premium_Economy">Premium Economy</option>
        </select>
      </span>
      <br />
      <br />
      <span>
        <h3>Passenger Information</h3>
      </span>
      <span>
        <label htmlFor="numOfAdults">Adults: </label>
        <input
          htmlFor="numOfAdults"
          // type="number"
          defaultValue="1"
          name="number of adults"
          className="border 1px rounded"
          onChange={handleChange("numOfAdults")}
        ></input>
        {"  "}
        <label htmlFor="numOfChildren">Children: </label>
        <input
          htmlFor="numOfChildren"
          defaultValue="0"
          name="number of children"
          className="border 1px rounded"
          onChange={handleChange("numOfChildren")}
        ></input>
        {"  "}
        <label htmlFor="numOfInfants">Infants: </label>
        <input
          htmlFor="numOfInfants"
          // type="number"
          defaultValue="0"
          name="number of infants"
          className="border 1px rounded"
          onChange={handleChange("numOfInfants")}
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
