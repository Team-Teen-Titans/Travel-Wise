import React, { useEffect, useState } from 'react';
import TripCard from './TripCard';
import { Link } from 'react-router-dom';

const MyTripFeed = ({ myTripsList }) => {

  return (
    <div className="flex flex-col justify-center items-center py-3">
      <h1 className="self-center text-3xl font-bold">My Trips</h1>
      {myTripsList.map((savedTripInfo, index) => (
        <TripCard key={index} savedTripInfo={savedTripInfo} />
      ))}
      {myTripsList.length === 0 && (
        <h3 className="pt-2">
          {' '}
              No trips saved yet! Click{' '}
          <span className="text-indigo-700 font-semibold underline">
            <Link to={'/'}>here</Link>
          </span>{' '}
              to search for flights.
        </h3>
      )}
    </div>
  );

};

export default MyTripFeed;

