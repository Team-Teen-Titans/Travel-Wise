import React, { useEffect, useState } from "react";
import TripCard from "./TripCard";
import { Link } from "react-router-dom";

const MyTripFeed = ({ myTripsList }) => {

  return (
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
  );

};

export default MyTripFeed;

