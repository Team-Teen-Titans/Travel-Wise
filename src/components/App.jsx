import React, { useState, createContext, useEffect, useRef, useLayoutEffect } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import { Route, Routes } from "react-router";
import VaccineMap from "./VaccineMap";
import FlightLocationSelector from './FlightLocationSelector';
import CovidMap from './CovidMap';
import Login from "./Login";
import SignUp from "./SignUp";
import CovidWorldData from './CovidWorldData';
import FlightsDisplayFeedContainer from "./FlightsDisplayFeedContainer";
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
        <Route exact path='/' element={<><FlightLocationSelector/><CovidMap/></>}/>
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
      </Routes>
      <Footer/>
    </AuthContext.Provider>
  )
};

export default App;
