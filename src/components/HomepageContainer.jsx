import React from "react";
import NavBar from "./Navbar";
import FlightSelector from "./FlightSelector";
import CovidMap from "./CovidMap";

const HomepageContainer = () => {
  return (
    <div>
      <FlightSelector />
      <CovidMap />
    </div>
  );
};

export default HomepageContainer;
