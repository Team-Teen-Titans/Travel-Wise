import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Spinner";
import FlightFeed from "./FlightFeed";
import { useLocation } from "react-router";

const FlightsDisplayFeedContainer = () => {
  const [loading, setLoading] = useState(true);
  const [counter2, setCounter2] = useState(0);
  const [flights, setFlights] = useState([]);
  const { state } = useLocation();
  const [counter, setCounter] = useState(0);

  const fetchInfo = async (count) => {
    if (count > 3) return "No flights were found. Please try another search.";
    console.log("options to post in FeedContainer:", state);
    try {
      const postStateToApi = await axios.post(
        "/api/flights/flight-info",
        state
      );
      console.log("data in FeedContainer:", postStateToApi.data);
      setLoading(false);
      setFlights(postStateToApi.data);
      if (flights === false && count <= 3) {
        setCounter2(counter2 + 1);
      }
      return;
    } catch (err) {
      // console.log("error in useEffect in FeedContainer:", err);
      setLoading(false);
      setCounter2(counter2 + 1);
      // setNoFlightsFound('No flights were found. Please try another search.');
    }
  };

  const runFetchFunction = async () => {
    console.log("running axios call function");
    setCounter(counter + 1);
    return await fetchInfo(counter);
  };

  useEffect(async () => await runFetchFunction(), [counter2]);

  // useEffect(async () => {
  //   console.log('options to post in FeedContainer:', state);
  //   try {
  //     const postStateToApi = await axios.post("/api/flights/flight-info", state);
  //     console.log('data in FeedContainer:', postStateToApi.data);
  //     setLoading(false);
  //     setFlights(postStateToApi.data);
  //   } catch (err) {
  //     // console.log("error in useEffect in FeedContainer:", err);
  //     setLoading(false);
  //     // setNoFlightsFound('No flights were found. Please try another search.');
  //   }
  // }, []);

  return (
    // loading ? <Loader /> : flights ? <FlightFeed flights={flights} /> : 'No flights were found. Please try another search.'
    loading ? (
      <Loader />
    ) : flights && flights.length > 0 ? (
      <FlightFeed flights={flights} />
    ) : (
      "No flights were found. Please try another search."
    )
  );
};

export default FlightsDisplayFeedContainer;
