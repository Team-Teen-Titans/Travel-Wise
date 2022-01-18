import React from 'react';
import { Chart } from 'react-google-charts';

const options = {
  alternatingRowStyle: true,
  showRowNumber: true,
  firstRowNumber: 0,
  backgroundColor: '#E4E4E4',
};

const Table = ({ countryData }) => {
  return (
    <Chart
      chartType="Table"
      width="100%"
      height="400px"
      data={countryData}
      options={options}
    />
  );
};

export default Table;
