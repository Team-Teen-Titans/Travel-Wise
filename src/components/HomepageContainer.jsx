import React from "react";
import FlightSelector from "./FlightSelector";
import CovidMap from "./CovidMap";
import Login from './Login';

const HomepageContainer = () => {
  return (
    <div>
      <FlightSelector />
      <CovidMap />
      <Login />
    </div>
  );
};

export default HomepageContainer;
