import React, { useEffect, useState } from "react";
import FlightCard from "./FlightCard";
import { Link } from "react-router-dom";

const FlightFeed = ({ flights }) => {
  const [flightsArr, setFlightsArr] = useState([]);
  useEffect(async () => {
    await setFlightsArr(
      flights
        .sort((a, b) => b.remainingSeatsCount - a.remainingSeatsCount)
        .slice(0, 30)
        .map((flightInfo, index) => {
          return <FlightCard key={index} flightInfo={flightInfo} />;
        })
    );
    // console.log(flightsArr, "flights info in state");
  }, []);
  return (
    <div>
      {/* <h3>Available Departing Flights: </h3>
      <br /> */}
      {/* {flights.map((flightInfo, index) => (
        <FlightCard key={index} flightInfo={flightInfo} />
      ))} */}
      {flightsArr}

      {flights.length === 0 && (
        <p>
          {" "}
          No flights available. Click <Link to={"/"}>here</Link> to return to
          the home page and search again.
        </p>
      )}
    </div>
  );
};

export default FlightFeed;
