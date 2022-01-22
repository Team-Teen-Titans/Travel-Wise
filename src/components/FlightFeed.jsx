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
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="font-extrabold text-3xl mt-2">Flights: </h1>
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
