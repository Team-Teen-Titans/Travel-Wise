import React from 'react';

const SubmitSearchButton = ({handleSubmit, submitDisabled}) => {
  if (!submitDisabled) {
    return (
      <button
        onClick={handleSubmit}
        className='rounded-md py-2.5 px-2.5 m-1 bg-green-500 text-white hover:bg-opacity-75 active:shadow-md scale-90'
        disabled={submitDisabled}
      >
						Search Flights Now
      </button>
    );
  } else {
    return (
      <button
        onClick={handleSubmit}
        className='rounded-md py-2.5 px-2.5 m-1 bg-gray-500 text-white hover:bg-opacity-75 active:shadow-md scale-90'
        disabled={submitDisabled}
      >
						Please fill all fields
      </button>
    );
  }
}; 

export default SubmitSearchButton;