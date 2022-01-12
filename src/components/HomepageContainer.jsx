import React from "react";
import NavBar from "./Navbar";
import FlightSelector from "./FlightSelector";
import CovidMap from "./CovidMap";

const HomepageContainer = () => {
  return (
    <div>
      <NavBar />
      <FlightSelector />
      <CovidMap />
    </div>
  );
};

export default HomepageContainer;
