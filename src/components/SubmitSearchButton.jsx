import React from "react";

const SubmitSearchButton = ({ handleSubmit, submitDisabled }) => {
  if (!submitDisabled) {
    return (
      <button
        onClick={handleSubmit}
        className="border 1px rounded bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 font-bold text-white uppercase px-6 py-2 text-sm outline-none focus:outline-none hover:opacity-75 mr-1 mb-1 ease-linear transition-all duration-150"
        disabled={submitDisabled}
      >
        Search Flights Now
      </button>
    );
  } else {
    return (
      <button
        onClick={handleSubmit}
        className="rounded-md py-2 px-6 m-1 bg-gray-500 text-white hover:bg-opacity-75 active:shadow-md scale-90"
        disabled={submitDisabled}
      >
        Please fill all fields
      </button>
    );
  }
};

export default SubmitSearchButton;
