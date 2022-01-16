import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { flightKey } from '../utils/constants';
import axios from 'axios';
import 'regenerator-runtime';
//import the modal here 

const FlightLocationSelector = () => {
  const [tripLocationInfo, setTripLocationInfo] = useState({
    originCity: '',
    destinationCity: '',
  });

  useEffect(() => {
    console.log(tripLocationInfo);
  });

  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    console.log(tripLocationInfo);
    //open the model here
    //set the modal to open 
    //when i render the modal, i pass in my state as a prop so it can make the call for airports
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripLocationInfo({ ...tripLocationInfo, [name]: value });
    console.log(tripLocationInfo);
  };

  return (
    <div className='place-center'>
      <span>
        <label htmlFor='origin-city'>Where from? </label>
        <input
          htmlFor='origin-city'
          name='originCity'
          placeholder='Enter departure city'
          className='border 1px rounded'
          onChange={handleChange('originCity')}
        />
      </span>
      <span>
        <label htmlFor='destination-city'>Where to? </label>
        <input
          htmlFor='destination-city'
          name='destinationCity'
          placeholder='Enter destination city'
          className='border 1px rounded'
          onChange={handleChange('destinationCity')}
        />
      </span>
      <button className='border 1px rounded' onClick={handleSearchSubmit}>Get Started</button>
    </div>
  );
};

export default FlightLocationSelector;
