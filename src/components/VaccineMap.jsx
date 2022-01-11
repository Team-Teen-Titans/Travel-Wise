import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { vaccinationOptions } from '../utils/constants';
import Loader from './Spinner';
import { useLocation } from 'react-router';
import object from '../utils/isoCodes';
import Table from './Table';

const VaccineMap = () => {
  const [ countryData, setCountryData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const { state } = useLocation();
  let iso;
  if (!state) {
    vaccinationOptions.params['iso'] = 'USA';
    iso = 'USA';
  } else {
    const { Country } = state;
    vaccinationOptions.params['iso'] = object[Country];
    iso = object[Country];
  }

  useEffect(() => {
    axios
      .request(vaccinationOptions)
      .then((response) => response.data)
      .then((data) => {
        const { country, total_vaccinations } = data[data.length-1];
        return { country, total_vaccinations };
      })
      .then((data) => {
        const cache = [ [], [] ];
        for (const property in data) {
          const capitalizedString = `${property[0].toUpperCase()}${property.slice(1)}`;
          const formattedString = capitalizedString.replaceAll(/_/g, ' ');
          cache[0].push(formattedString);
          const dataPoint = Number.isNaN(+data[property]) ? data[property] : +data[property];
          cache[1].push(dataPoint);
        }
        setCountryData(cache);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const options = {
  };
    

  return (
    <div>
      <h1>Vaccine Map</h1>
      {loading ? <Loader/> :
        <Chart 
          chartType="GeoChart"
          width="100%"
          height="60vh"
          data={countryData}
          options={options}
        />
      }
      {loading ? <Loader/> : 
        <Table iso={iso}/>
      }
    </div>
  );

};

export default VaccineMap;
