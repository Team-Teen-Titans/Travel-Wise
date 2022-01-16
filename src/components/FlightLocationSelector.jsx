import React, { useState, useEffect } from 'react';
import 'regenerator-runtime';
import FlightModal from './FlightModal';

const FlightLocationSelector = () => {
  const [tripLocationInfo, setTripLocationInfo] = useState({
    originCity: '',
    destinationCity: '',
  });

  const [showModal, setShowModal] = false;

  useEffect(() => {
    console.log(tripLocationInfo);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripLocationInfo({ ...tripLocationInfo, [name]: value });
    console.log(tripLocationInfo);
  };

  const handleSearchSubmit = () => {
    console.log('state upon submit: ', tripLocationInfo);
    setShowModal(true);
    //onclick sets modal to open?
    //when i render the modal, i pass in my state as a prop so it can make the call for airports
    //need to pass in state of modal
  };

  return (
    <div className='place-center'>
      <span>
        <label htmlFor='origin-city' className='py-4 text-lg my-0.5 mx-0.5'>Where from? </label>
        <input
          htmlFor='origin-city'
          name='originCity'
          placeholder='Enter departure city'
          className='border 1px rounded'
          onChange={handleChange}
        />
      </span>
      <span>
        <label htmlFor='destination-city' className='py-4 text-lg my-0.5 mx-0.5'>Where to? </label>
        <input
          htmlFor='destination-city'
          name='destinationCity'
          placeholder='Enter destination city'
          className='border 1px rounded'
          onChange={handleChange}
        />
      </span>
      <button className='border 1px rounded' onClick={handleSearchSubmit}>Get Started</button>
      {showModal && <FlightModal tripLocationInfo={tripLocationInfo}/>}

    </div>
  );
};

export default FlightLocationSelector;
