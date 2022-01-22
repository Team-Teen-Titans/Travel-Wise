import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { vaccinationOptions } from '../utils/constants';
import Loader from './Spinner';
import { useLocation } from 'react-router';
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
        //setting onhover data for vaccine map
        const latestVaccinationData = data[data.length - 1];
        const onHoverMapDataArray = [['Country','Total Vaccinations'], [state, Number(latestVaccinationData.total_vaccinations)]]
        setOnHoverMapData(onHoverMapDataArray);

        //setting table data for the Table component
        const countryDataArray = [['','']];
        for (const property in latestVaccinationData) {
          const formattedPropertyName = property.replace(/(^[a-z])|(_[a-z])/g, matched => matched.toUpperCase().replace('_', ' '));
          countryDataArray.push([formattedPropertyName, latestVaccinationData[property]])
        }
        console.log(countryDataArray)
        setCountryData(countryDataArray);
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
      {loading ? <Loader /> : <Table countryData={countryData} />}
    </div>
  );
};

export default VaccineMap;