import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { countryNameToCode, vaccinationOptions } from '../utils/constants';
import Loader from './Spinner';
import { useLocation } from 'react-router';
import object from '../utils/isoCodes';
import Table from './Table';

const VaccineMap = () => {
  const [countryData, setCountryData] = useState([]);
  const [onHoverMapData, setOnHoverMapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();

  useEffect(() => {
    vaccinationOptions.params.iso = state.iso;
    axios.request(vaccinationOptions)
      .then(({ data }) => {
        // console.log('data:',data)
        const latestVaccinationData = data[data.length - 1];
        console.log(latestVaccinationData)
        const onHoverMapDataArray = [['Country','Total Vaccinations'], [state, latestVaccinationData.total_vaccinations]]
        setOnHoverMapData(onHoverMapDataArray);
        console.log('onHoverMapDataArray:',onHoverMapDataArray)
        const countryDataArray = [['Country','Total Vaccinations']];
        for (const property in latestVaccinationData) {
          const formattedPropertyName = property.replace(/(^[a-z])|(_[a-z])/g, matched => matched.toUpperCase().replace('_', ' '));
          countryDataArray.push([formattedPropertyName, latestVaccinationData[property]])
        }
        setCountryData(countryDataArray);
        console.log(countryData)
        // console.log(countryData.slice(0,2))
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const options = {};

  return (
    <div>
      <h1 align='center' className='py-4 text-lg font-mono'>
        Total Number of Vaccinations
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <Chart
          chartType='GeoChart'
          width='100%'
          height='60vh'
          data={onHoverMapData}
          options={options}
        />
      )}
      {loading ? <Loader /> : <Table iso={countryData} />}
    </div>
  );
};

export default VaccineMap;
