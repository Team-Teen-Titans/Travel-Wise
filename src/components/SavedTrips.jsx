import React, { useState, useEffect } from "react";
import TripCard from "./TripCard"
import { Link } from "react-router-dom";

const SavedTrips = () => {
  // pull users saved tripInfo searches from database
  const tripsList = [{
    originAirport: 'SEA',
    destinationAirport: 'HNL',
    departureDate: '2022-01-22',
    returnDate: '2022-01-29',
    oneWayOrRound: 'onewaytrip',
    numOfAdults: 1,
    numOfChildren: 0,
    numOfInfants: 0,
    cabinClass: 'Economy'
  },
  {
    originAirport: 'LAX',
    destinationAirport: 'JFK',
    departureDate: '2022-01-22',
    returnDate: '2022-01-29',
    oneWayOrRound: 'roundtrip',
    numOfAdults: 2,
    numOfChildren: 1,
    numOfInfants: 1,
    cabinClass: 'First'
  }];
  // render saved tripInfo
  return (
    <div>
      <h3>Saved Trips</h3>
      {tripsList.map((savedTripInfo, index) => (
        <TripCard key={index} savedTripInfo={savedTripInfo} />
      ))}
      {tripsList.length === 0 && (
        <p>
          {' '}
			No trips saved. Click <Link to={'/'}>here</Link> to return
			to the home page and search again.
        </p>
      )}
    </div>
  );
};

export default SavedTrips;