import React from "react";
import { render } from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./components/App";
import About from "./components/About";
import VaccineMap from "./components/VaccineMap";
import CovidMap from "./components/CovidMap";
import Styles from "./stylesheets/styles.css";
import FlightSelector from "./components/FlightSelector";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<CovidMap />} />
        <Route path="home" element={<CovidMap />} />
        <Route
          path="country"
          element={<VaccineMap />}
          render={(props) => <VaccineMap {...props} />}
        />
        <Route path="about" element={<About />} />
        {/* temporarily added a selector path to load for implementation of front-end */}
        <Route path="selector" element={<FlightSelector />} />
      </Route>
    </Routes>
  </BrowserRouter>,

  document.getElementById("root")
);
