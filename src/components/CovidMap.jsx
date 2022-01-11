import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { covidOptions, countryCodeToName } from '../utils/constants';
import Loader from './Spinner';
import { Link, useNavigate } from 'react-router-dom';

const CovidMap = () => {
  const [covidData, setCovidData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .request(covidOptions)
      .then((response) => response.data)
      .then((data) => {
        const cache = data.map((el) => {
          return [countryCodeToName[el.Country] || el.Country, el.TotalCases];
        });
        cache.unshift(['Country', 'Total Cases']);
        setCovidData(cache);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const options = {
    colorAxis: { colors: ['green', 'black', 'red'] },
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <h1>Covid Map</h1>
      { loading ? <Loader/> :
        <Chart 
          chartEvents={[
            {
              eventName: 'select',
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = covidData[selection[0].row + 1];
                navigate('/country', {state: { Country: region[0] }});
              },
            },
          ]}
          chartType="GeoChart"
          width="100%"
          height="60vh"
          data={covidData}
          options={options}
        />
      }
    </div>
  );
};

export default CovidMap;
