import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Spinner';
import { globalCovidOptions } from '../utils/constants';
import { BiWorld } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';

const CovidWorldData = () => {
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [state, setState] = useState({
    activeCases: '',
    caseFatality: '',
    newCases: '',
    newDeaths: '',
    newRecovered: '',
    critical: '',
    totalCases: '',
    totalDeaths: '',
    totalRecovered: '',
  });

  useEffect(() => {
    axios
      .request(globalCovidOptions)
      .then(({ data }) => {
        setLoading(false);
        setState({
          activeCases: data[0].ActiveCases.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          caseFatality: data[0].Case_Fatality_Rate,
          newCases: data[0].NewCases.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          newDeaths: data[0].NewDeaths.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          newRecovered: data[0].NewRecovered.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          critical: data[0].Serious_Critical.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          totalCases: data[0].TotalCases.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          totalDeaths: data[0].TotalDeaths.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          totalRecovered: data[0].TotalRecovered.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(state);
  return (
    <div className='flex flex-col min-h-screen'>
      <h1 align='center' className='py-4 text-3xl font-mono border-2 rounded'>
        Global Covid Data
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div flex flex-row min-h-screen justify-center items-center>
            <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:h-20 sm:w-20'>
              <BiWorld className='h-10 w-10 text-green-600 animate-pulse' />
            </div>
            <div className='m-2.5 p-2.5 flex justify-center items-center'>
              <span className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                Active Cases: {state.activeCases}
              </span>
            </div>
            <div className='m-2.5 p-2.5 flex justify-center items-center'>
              <span className='text-gray-700 background-transparent font-bold uppercase px-6 py-2 text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                Total Cases: {state.totalCases}
              </span>
            </div>
            <div className='m-2.5 p-2.5 flex justify-center items-center'>
              <span className='text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                Total Deaths: {state.totalDeaths}
              </span>
            </div>
            <div className='m-2.5 p-2.5 flex justify-center items-center'>
              <span className='text-green-500 background-transparent font-bold uppercase px-6 py-2 text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                Total Recovered: {state.totalRecovered}
              </span>
            </div>
          </div>
          <div className='m-2.5 p-2.5 flex justify-center items-center'>
            <button
              onClick={() => setToggle(true)}
              className='border 1px rounded text-blue-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            >
              View More
            </button>
          </div>
          {toggle && (
            <div className='m-2.5 p-2.5 flex justify-center items-center bg-gray-300 bg-opacity-30'>
              <span className='m-2.5 p-2.5 flex justify-center items-center text-gray-900 font-bold uppercase px-6 py-2 text-l outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>New Cases: {state.newCases}</span>
              <span className='m-2.5 p-2.5 flex justify-center items-center text-gray-900 font-bold uppercase px-6 py-2 text-l outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>New Deaths: {state.newDeaths}</span>
              <span className='m-2.5 p-2.5 flex justify-center items-center text-gray-900 font-bold uppercase px-6 py-2 text-l outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>New Recovered: {state.newRecovered}</span>
              <span className='m-2.5 p-2.5 flex justify-center items-center text-gray-900 font-bold uppercase px-6 py-2 text-l outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Critical Cases: {state.critical}</span>
              <span className='m-2.5 p-2.5 flex justify-center items-center text-gray-900 font-bold uppercase px-6 py-2 text-l outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Case Fatality: {state.caseFatality}%</span>
              <AiFillCloseCircle
                onClick={() => setToggle(false)}
                className='cursor-pointer text-red-600 rounded-full bg-red-100 sm:mx-0 sm:h-4 sm:w-4'
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CovidWorldData;
