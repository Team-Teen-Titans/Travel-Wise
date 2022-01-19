import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Spinner";
import FlightFeed from "./FlightFeed";
import { useLocation } from "react-router";

const FlightsDisplayFeedContainer = () => {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState(null);
  const { state } = useLocation();

  // const [tripInfo, setTripInfo] = useState(props.state);

  useEffect(() => {
    console.log(state);
    axios
      .post(
        "/api/flights/flight-info",
        state
        // {
        // originAirport: "LAX",
        // destinationAirport: "MIA",
        // departureDate: "2022-01-20",
        // returnDate: "2022-02-20",
        // oneWayOrRound: "roundtrip",
        // numOfAdults: 1,
        // numOfChildren: 0,
        // numOfInfants: 0,
        // cabinClass: "Economy",
        // ...tripInfo,
        // }
      )
      .then((res) => res.data)
      .then((apiFlightInfo) => {
        setFlights(apiFlightInfo);
        setLoading(false);
      })
      .catch((err) => console.log("error from server:", err));
  }, []);
  return <div>{loading ? <Loader /> : <FlightFeed flights={flights} />}</div>;
};

export default FlightsDisplayFeedContainer;
