import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Spinner";
import FlightFeed from "./FlightFeed";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const FlightsDisplayFeedContainer = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState(false);

  const fetchInfo = async (count = 0) => {
    if (count > 3) return "No flights were found. Please try another search.";
    console.log("options to post in FeedContainer:", state);
    try {
      const postStateToApi = await axios.post(
        "/api/flights/flight-info",
        state
      );
      console.log("data in FeedContainer:", postStateToApi.data);
      setFlights(postStateToApi.data);
      if (postStateToApi.data === false && count <= 3) {
        return await fetchInfo(count + 1);
      }
      setLoading(false);
      return;
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(async () => await fetchInfo(), []);

  return loading ? (
    <Loader />
  ) : flights ? (
    <FlightFeed flights={flights} />
  ) : (
    <p>
      {" "}
      No flights available. Click <Link to={"/"}>here</Link> to return to the
      home page and search again.
    </p>
  );
};

export default FlightsDisplayFeedContainer;
