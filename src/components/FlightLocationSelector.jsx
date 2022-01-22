import React, { useState, useEffect } from "react";
import "regenerator-runtime";
import FlightModal from "./FlightModal";
import MyTrips from "./MyTrips";

const FlightLocationSelector = () => {
  const [tripLocationInfo, setTripLocationInfo] = useState({
    originCity: "",
    destinationCity: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripLocationInfo({ ...tripLocationInfo, [name]: value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setKey(key + 1);
    setShowModal(true);
  };

  return (
    <div className="flex justify-center items-center my-20">
      <form onSubmit={handleSearchSubmit}>
        <span>
          <label
            htmlFor="origin-city"
            className="mx-3.5 py-4 text-lg my-0.5 mx-0.5 font-semibold text-xl tracking-tight"
          >
            {"Where from? "}
          </label>
          <input
            htmlFor="origin-city"
            name="originCity"
            placeholder="Enter departure city"
            className="border 1px rounded rounded-md py-2.5 px-2.5 m-1 hover:bg-gray-100 focus:bg-blue-100"
            onChange={handleChange}
          />
        </span>
        <span>
          <label
            htmlFor="destination-city"
            className="mx-3.5 py-4 text-lg my-0.5 mx-0.5 font-semibold text-xl tracking-tight"
          >
            {"Where to? "}
          </label>
          <input
            htmlFor="destination-city"
            name="destinationCity"
            placeholder="Enter destination city"
            className="border 1px rounded rounded-md py-2.5 px-2.5 m-1 hover:bg-gray-100 focus:bg-blue-100"
            onChange={handleChange}
          />
        </span>
        {/* <br /> */}
        <button
          className="text-lg mx-3.5 rounded-md py-2.5 px-2.5 m-1 bg-green-500 text-white hover:bg-opacity-75 active:shadow-md scale-90"
          type="submit"
          onClick={handleSearchSubmit}
        >
          Get Started
        </button>
      </form>
      {showModal && (
        <FlightModal key={key} tripLocationInfo={tripLocationInfo} />
      )}
    </div>
  );
};

export default FlightLocationSelector;
