import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { vaccinationOptions } from '../utils/constants';

const options = {
  allowHtml: true,
  showRowNumber: true,
  firstRowNumber: 0,
  backgroundColor: '#E4E4E4',
};

const formatters = [
  {
    column: [0, 1],
    options: '<a href="mailto:{1}">{0}</a>',
  },
];

const Table = ({iso}) => {
  const [ covidData, setCovidData ] = useState([]);
  vaccinationOptions.params['iso'] = iso;

  useEffect(() => {
    
    axios
      .request(vaccinationOptions)
      .then((response) => response.data)
      .then((data) => data[data.length-1])
      .then((data) => {
        const cache = [['','']];
        for (const property in data) {
          const capitalizedString = `${property[0].toUpperCase()}${property.slice(1)}`;
          const formattedString = capitalizedString.replaceAll(/_/g, ' ');
          cache.push([formattedString, data[property]]);
        }
        setCovidData(cache);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <Chart
      chartType="Table"
      width="100%"
      height="400px"
      data={covidData}
      options={options}
      formatters={formatters}
    />
  );
};

export default Table;
