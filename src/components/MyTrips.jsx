import React, { useState, useEffect } from "react";
import TripCard from "./TripCard"
import { Link } from "react-router-dom";

const MyTrips = () => {
  // pull users saved tripInfo searches from database and put into an array
  const myTripsList = [{
    tripNickname: 'My Hawaii Trip',
    originAirportList: ['SEA', 'LKE', 'BFI'],
    originAirport: 'SEA',
    destinationAirportList: ['HNL', 'HIK'],
    destinationAirport: 'HNL',
    departureDate: '2022-02-04',
    returnDate: '2022-02-12',
    oneWayOrRound: 'onewaytrip',
    numOfAdults: 1,
    numOfChildren: 0,
    numOfInfants: 0,
    cabinClass: 'Economy'
  },
  {
    tripNickname: 'My Codesmith tour',
    originAirportList: ['LAX', 'LOB', 'LSN'],
    originAirport: 'LAX',
    destinationAirportList: ['JFK','LGA'],
    destinationAirport: 'JFK',
    departureDate: '2022-02-05',
    returnDate: '2022-02-19',
    oneWayOrRound: 'roundtrip',
    numOfAdults: 1,
    numOfChildren: 0,
    numOfInfants: 0,
    cabinClass: 'First'
  }];
  // render saved tripInfo
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

export default MyTrips;