import React, { useState, createContext, useEffect, useRef, useLayoutEffect } from 'react';
import NavBar from './Navbar';
import { Route, Routes } from "react-router";
import VaccineMap from "./VaccineMap";
import FlightLocationSelector from './FlightLocationSelector';
import CovidMap from './CovidMap';
import Login from "./Login";
import SignUp from "./SignUp";
import CovidWorldData from "./CovidWorldData";
import FlightsDisplayFeedContainer from "./FlightsDisplayFeedContainer";
import MyTrips from "./MyTrips";
import "../stylesheets/styles.css";
import axios from 'axios';

export const AuthContext = createContext();

const App = () => {
  const [isAuthed, setIsAuthed] = useState(false);

  const [refetchAuth, setRefetchAuth] = useState(0);

  useEffect(async () => {
    try {
      const userInfo = await axios.get('/api/user/logged-in');
      setIsAuthed(userInfo.data);
    } catch (err) {
      console.error('error from App',err)
      setIsAuthed(false);
    }
  }, [refetchAuth])

  return (
    <AuthContext.Provider value={isAuthed}>
      <NavBar setRefetchAuth={setRefetchAuth}/>
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
        <Route path="/login" element={<Login setRefetchAuth={setRefetchAuth} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/covid-update" element={<CovidWorldData />} />
        <Route
          path="/flights-display"
          element={<FlightsDisplayFeedContainer />}
          render={(props) => <FlightsDisplayFeedContainer {...props} />}
        />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </AuthContext.Provider>
  )
};

export default App;
