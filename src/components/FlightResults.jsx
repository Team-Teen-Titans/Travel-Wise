import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from './Spinner';

const FlightResults = () => {
  const { state } = useLocation();
  const [tripInfo, setTripInfo] = useState(state);
  const [loading, setLoading] = useState(true);
  console.log('state:', state);
  console.log('tripInfo:', tripInfo);

  //left off with working airport code (not promise) coming in, but we need to run function so it works 
  //for both origin and destination

  //function requests the airport codes from the backend by referencing the city name
  //backend hits the API and returns the airport codes
  const getAirportCode = async (originCity, destinationCity) => {
    try {
      const originUrl = originCity.replace(/\s/g, '%20');
      const destinationUrl = destinationCity.replace(/\s/g, '%20');
      const originRes = await axios.get(`/api/flights/airport/${originUrl}`);
      const destinationRes = await axios.get(`/api/flights/airport/${destinationUrl}`);
      setTripInfo({...tripInfo, 
        originAirport : originRes.data, 
        destinationAirport : destinationRes.data});
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAirportCode(state.originAirport, state.destinationAirport);
  }, []);

  return (
    <div className="flex">
      {loading ? 
        <Loader /> : 
        <div>
          <div>Origin Airport: {tripInfo.originAirport}</div>
          <div>Destination Airport: {tripInfo.destinationAirport}</div>
        </div>
      } 
    </div>
  );
};

export default FlightResults;
