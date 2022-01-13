import React from "react";
import { render } from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./components/App";
import About from "./components/About";
import VaccineMap from "./components/VaccineMap";
import HomepageContainer from "./components/HomepageContainer";
import Styles from "./stylesheets/styles.css";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<HomepageContainer />} />
        <Route path="home" element={<HomepageContainer />} />
        <Route
          path="country"
          element={<VaccineMap />}
          render={(props) => <VaccineMap {...props} />}
        />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>,

  document.getElementById("root")
);
