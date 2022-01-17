import React from 'react';
import FlightLocationSelector from './FlightLocationSelector';
import CovidMap from './CovidMap';
import Login from './Login';

const HomepageContainer = () => {
  return (
    <div>
      <FlightLocationSelector />
      <CovidMap />
      <Login />
    </div>
  );
};

export default HomepageContainer;
