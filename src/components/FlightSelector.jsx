import React, { useState, useEffect } from "react";

const FlightSelector = () => {
  const [howManyWays, setHowManyWays] = useState(null);
  const [tripInfo, setTripInfo] = useState(null);

  return (
    <div className=" ">
      <h3>Type of trip?</h3>
      <span>
        <button onClick={() => setHowManyWays(1)}>one way</button>
        {" or "}
        <button onClick={() => setHowManyWays(2)}>round trip</button>
      </span>

      <br />
      <br />

      <span>
        <p>Departure Date: </p>
        <input type="date"></input>
        {"  "}
        <p>Return Date: </p>
        <input type="date"></input>
      </span>

      <span>
        <p>From City: </p>
        <input></input>
        {"  "}
        <p>Destination: </p>
        <input></input>
      </span>
    </div>
  );
};

export default FlightSelector;
