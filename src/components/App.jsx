import React from "react";
import NavBar from "./Navbar";
// import Footer from "./unused_components/Footer";
import { Route, Routes } from "react-router";
// import About from "./About";
import VaccineMap from "./VaccineMap";
import FlightLocationSelector from "./FlightLocationSelector";
import CovidMap from "./CovidMap";
import Login from "./Login";
import SignUp from "./SignUp";
import CovidWorldData from "./CovidWorldData";
import FlightsDisplayFeedContainer from "./FlightsDisplayFeedContainer";
import "../stylesheets/styles.css";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <div className="flex flex-col items-center pt-5">
                <h1 className="font-extrabold text-3xl">
                  Traveling in a pandemic is hard.{" "}
                </h1>
                <h1 className="font-extrabold text-2xl">We make it easy.</h1>
              </div>
              <FlightLocationSelector />
              <CovidMap />
            </>
          }
        />
        <Route
          path="country"
          element={<VaccineMap />}
          render={(props) => <VaccineMap {...props} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/covid-update" element={<CovidWorldData />} />
        <Route
          path="/flights-display"
          element={<FlightsDisplayFeedContainer />}
          render={(props) => <FlightsDisplayFeedContainer {...props} />}
        />
      </Routes>
      {/* <Footer/> */}
    </>
  );
};

export default App;
