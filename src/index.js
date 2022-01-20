import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
// import About from "./components/About";
// import VaccineMap from "./components/VaccineMap";
// import HomepageContainer from "./components/HomepageContainer";
// import Login from "./components/Login";
// import Styles from "./stylesheets/styles.css";
// import SignUp from "./components/SignUp";
// import FlightsDisplayFeedContainer from "./components/FlightsDisplayFeedContainer";

render(
  <BrowserRouter>
    {/* <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<HomepageContainer />} />
        <Route path="home" element={<HomepageContainer />} />
        <Route
          path="country"
          element={<VaccineMap />}
          render={(props) => <VaccineMap {...props} />}
        />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="flights-display"
          element={<FlightsDisplayFeedContainer />}
          render={(props) => <FlightsDisplayFeedContainer {...props} />}
        />
      </Route>
    </Routes> */}
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
