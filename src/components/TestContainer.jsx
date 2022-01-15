import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Spinner";
import FlightFeed from "./FlightFeed";

const TestContainer = ({ state }) => {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState(null);
  const [testInfo, setTestInfo] = useState({
    originAirport: "LAX",
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
    setLoading(false);
  }, []);
  return <div>{loading ? <Loader /> : <FlightFeed flights={flights} />}</div>;
};

export default TestContainer;
