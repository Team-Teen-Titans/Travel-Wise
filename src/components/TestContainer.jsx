import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Spinner";
import FlightFeed from "./FlightFeed";
import { getFlightsList } from "../utils/constants";

const TestContainer = ({ state }) => {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState(null);

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
        console.log(res, "res from flights info query");
        return res.data;
      })
      .then((apiFlightInfo) => {
        setFlights(getFlightsList(apiFlightInfo));
        console.log(
          "flights as defined after returning res.data in front-end",
          flights
        );
        setLoading(false);
      })
      .catch((err) => console.log("error from server:", err));
  }, []);
  return <div>{loading ? <Loader /> : <FlightFeed flights={flights} />}</div>;
};

export default TestContainer;
