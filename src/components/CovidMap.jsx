import React, { useEffect, useState } from 'react';
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
      .then(({ data }) => {
        //initialize data array with the names of the columns
        const formattedData = [['Country', 'Cases per 100,000']];

        //loop thru data, adding info from the API to "formattedData" array
        for (let i = 0; i < data.length; i++) {
          const { ActiveCases, Population, Country, TwoLetterSymbol, ThreeLetterSymbol } = data[i];
          if (Country === 'Diamond Princess' || Country === 'MS Zaandam' || Country === 'Channel Islands') {
            continue;
          }
          const casesPerNum = Math.floor((ActiveCases / Population) * 100000) > 0 && Math.floor((ActiveCases / Population) * 100000) || 0;
          formattedData.push([{v: TwoLetterSymbol , f: Country, iso: ThreeLetterSymbol.toUpperCase()}, casesPerNum]);
          //NOTE: the google map chart does not require a "iso" property for the first column, but we save it there so we can pass that object to the "VaccineMap" component
          //  because that component needs a three-letter iso code in order to make its API request
        }
        setCovidData(formattedData);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const options = {
    colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
    // backgroundColor: '#81d4fa',
    datalessRegionColor: 'grey',
    defaultColor: '#f5f5f5',
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <h1 align='center' className='py-4 text-lg font-mono'>Active Covid-19 Cases per 100,000 People</h1>
      {loading ? (
        <Loader />
      ) : (
        <Chart
          chartEvents={[
            {
              eventName: 'select',
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = covidData[selection[0].row + 1];
                navigate('/country', { state: region[0] });
              },
            },
          ]}
          chartType='GeoChart'
          width='100%'
          height='60vh'
          data={covidData}
          options={options}
        />
      )}
    </div>
  );
};

export default CovidMap;