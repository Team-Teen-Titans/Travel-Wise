import React, { useState, useEffect } from "react";
import TripCard from "./TripCard"
import { Link } from "react-router-dom";
import Loader from "./Spinner";
import axios from "axios";

const MyTrips = () => {
  const [loading, setLoading] = useState(true);
  const [myTripsList, setMyTripsList] = useState([]);

  // on mount pull users saved tripInfo searches from database and put into an array
  useEffect(() => {
    axios
      .get('/api/saved-flights/get-saved-flights')
      .then(({ data }) => {
        setMyTripsList(data);
        console.log(data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // render saved tripInfo
  return (
    <div>
      {loading ? (
        <Loader />
      )
        :
        (
          <div>
            <h3>My Trips</h3>
            {myTripsList.map((savedTripInfo, index) => (
              <TripCard key={index} savedTripInfo={savedTripInfo} />
            ))}
            {myTripsList.length === 0 && (
              <p>
                {' '}
        No trips saved yet! Click <Link to={'/'}>here</Link> to return
        to the home page. 
              </p>
            )}
          </div>
        )}
    </div>
  );
};

export default MyTrips;