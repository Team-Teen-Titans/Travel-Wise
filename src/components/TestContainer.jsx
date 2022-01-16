import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Spinner";
import FlightFeed from "./FlightFeed";

const TestContainer = ({ state }) => {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState(null);
  const [testInfo, setTestInfo] = useState({
    originAirport: "LAX",
    destinationAirport: "MIA",
    departureDate: "2022-01-20",
    returnDate: "2022-02-20",
    oneWayOrRound: "roundtrip",
    numOfAdults: 1,
    numOfChildren: 0,
    numOfInfants: 0,
    cabinClass: "Economy",
  });

  useEffect(() => {
    axios
      .post("/api/flights/flight-info", {
        originAirport: "LAX",
        destinationAirport: "MIA",
        departureDate: "2022-01-20",
        returnDate: "2022-02-20",
        oneWayOrRound: "roundtrip",
        numOfAdults: 1,
        numOfChildren: 0,
        numOfInfants: 0,
        cabinClass: "Economy",
      })
      .then((res) => {
        setFlights(res.data.purchaseLinks);
        console.log("res.data in front-end", res.data);
        setLoading(false);
      })
      .catch((err) => console.log("error from server:", err));
  }, []);
  return <div>{loading ? <Loader /> : <FlightFeed flights={flights} />}</div>;
};

export default TestContainer;
