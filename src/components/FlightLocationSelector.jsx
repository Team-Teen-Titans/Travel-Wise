import React, { useState } from "react";
import "regenerator-runtime";
import FlightModal from "./FlightModal";
import MyTrips from "./MyTrips";

const FlightLocationSelector = () => {
  const [tripLocationInfo, setTripLocationInfo] = useState({
    originCity: "",
    destinationCity: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState(0);

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
    <div className="flex justify-center items-center mt-10">
      <form onSubmit={handleSearchSubmit}>
        <span>
          <label
            htmlFor="origin-city"
            className="mx-3.5 py-4 text-lg my-0.5 mx-0.5 font-semibold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400"
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
            className="mx-3.5 py-4 text-lg my-0.5 mx-0.5 font-semibold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400"
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
        <br />
        <div className="flex justify-center items-center">
          <button
            className="hover:text-green-300 border 1px rounded mt-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 font-bold text-white uppercase px-6 py-2 text-sm outline-none focus:outline-none hover:opacity-75 mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
            onClick={handleSearchSubmit}
          >
            Get Started
          </button>
        </div>
      </form>
      {showModal && (
        <FlightModal key={key} tripLocationInfo={tripLocationInfo} />
      )}
    </div>
  );
};

export default FlightLocationSelector;
