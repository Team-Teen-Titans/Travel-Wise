import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const FlightResults = () => {
  const { state } = useLocation();
  console.log('state:', state);

  //function requests the airport codes from the backend by referencing the city name
  //backend hits the API and returns the airport codes
  const getAirportCode = (cityName) => {
    const cityUrl = cityName.replace(/\s/g, '%20');
    console.log(cityUrl);
    return axios
      .request({
        method: 'GET',
        url: `/api/flights/airport/${cityUrl}`,
      })
      .then(res => {
        console.log('res.data:', res.data)
        console.log(typeof res.data, 'type of res.data')
        return res.data
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const originCode = getAirportCode(state.originAirport);
    const destinationCode = getAirportCode(state.destinationAirport);
    console.log(originCode, 'origin code in useEffect');
    console.log(destinationCode, 'destination code in useEffect');
  }, []);

  return (
    <div className="flex">
      Flight results here
    </div>
  );
};

export default FlightResults;
