import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Spinner";
import FlightFeed from "./FlightFeed";
import { useLocation } from "react-router";

const FlightsDisplayFeedContainer = () => {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState([]);
  const { state } = useLocation();
  // const [noFlightsFound, setNoFlightsFound] = useState(false);

  // const [tripInfo, setTripInfo] = useState(props.state);

  useEffect(async () => {
    console.log('options to post in FeedContainer:', state);
    try {
      const postStateToApi = await axios.post("/api/flights/flight-info", state);
      console.log('data in FeedContainer:', postStateToApi.data);
      setLoading(false);
      setFlights(postStateToApi.data);
    } catch (err) {
      // console.log("error in useEffect in FeedContainer:", err);
      setLoading(false);
      // setNoFlightsFound('No flights were found. Please try another search.');
    }
  }, []);

  return (
    loading ? <Loader /> : flights ? <FlightFeed flights={flights} /> : 'No flights were found. Please try another search.'
    );
};

export default FlightsDisplayFeedContainer;
