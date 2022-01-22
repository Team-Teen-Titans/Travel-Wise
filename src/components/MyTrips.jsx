import React, { useState, useEffect } from "react";
import MyTripFeed from "./MyTripFeed"
import { Link } from "react-router-dom";
import Loader from "./Spinner";
import axios from "axios";

const MyTrips = () => {
  const [loading, setLoading] = useState(true);
  const [myTripsList, setMyTripsList] = useState([]);

  // on mount pull users saved tripInfo searches from database and put into an array
  useEffect(async () => {
    try {
      const savedTripInfo = await axios.get('/api/saved-flights/get-saved-flights');
      setMyTripsList(savedTripInfo.data);
      setLoading(false);
    }
    catch (err) {
      console.error('err in getting saved flights:', err);
    }
  }, []);

  // render saved tripInfo
  return (
    <div>
      {loading ? (
      <div className="flex justify-center items-center pt-20">
        <Loader />
      </div>
      )
        :
        (
          <MyTripFeed myTripsList={myTripsList}/>
        )}
    </div>
  );
};

export default MyTrips;
