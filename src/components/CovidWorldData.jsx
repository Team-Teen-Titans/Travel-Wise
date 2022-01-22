import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Spinner";
import { NEW_COVID_WORLD_ENDPOINT } from "../utils/constants";
import { BiWorld } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";

const CovidWorldData = () => {
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [state, setState] = useState({
    activeCases: "",
    caseFatality: "",
    newCases: "",
    todayDeaths: "",
    todayRecovered: "",
    critical: "",
    totalCases: "",
    totalDeaths: "",
    totalRecovered: "",
  });

  useEffect(() => {
    axios
      .get(NEW_COVID_WORLD_ENDPOINT)
      .then(({ data }) => {
        setLoading(false);
        setState({
          activeCases: data[0].active.toLocaleString(),
          caseFatality: (
            (data[0].deaths / data[0].cases) *
            100
          ).toLocaleString(),
          newCases: data[0].todayCases.toLocaleString(),
          todayDeaths: data[0].todayDeaths.toLocaleString(),
          todayRecovered: data[0].todayRecovered.toLocaleString(),
          critical: data[0].critical.toLocaleString(),
          totalCases: data[0].cases.toLocaleString(),
          totalDeaths: data[0].deaths.toLocaleString(),
          totalRecovered: data[0].recovered.toLocaleString(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex flex-col min-h-screen flex h-screen">
      <h1 align="center" className="py-4 text-3xl font-mono border-2 rounded">
        Global Covid Data
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div>
          <div>
            <div className="my-6 mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:h-20 sm:w-20">
              <BiWorld className="h-10 w-10 text-green-600 animate-pulse" />
            </div>
            <div className="m-2.5 p-2.5 flex justify-center items-center">
              <span className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Active Cases: {state.activeCases}
              </span>
            </div>
            <div className="m-2.5 p-2.5 flex justify-center items-center">
              <span className="text-gray-700 background-transparent font-bold uppercase px-6 py-2 text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Total Cases: {state.totalCases}
              </span>
            </div>
            <div className="m-2.5 p-2.5 flex justify-center items-center">
              <span className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Total Deaths: {state.totalDeaths}
              </span>
            </div>
            <div className="m-2.5 p-2.5 flex justify-center items-center">
              <span className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Total Recovered: {state.totalRecovered}
              </span>
            </div>
          </div>
          <div className="m-2.5 p-2.5 flex justify-center items-center">
            <button
              onClick={() => setToggle(true)}
              className="border 1px rounded text-blue-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              View More
            </button>
          </div>
          {toggle && (
            <div className="m-2.5 p-2.5 flex justify-center items-center bg-gray-300 bg-opacity-30">
              <span className="m-2.5 p-2.5 flex justify-center items-center text-gray-900 font-bold uppercase px-6 py-2 text-l outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                New Cases: {state.newCases}
              </span>
              <span className="m-2.5 p-2.5 flex justify-center items-center text-gray-900 font-bold uppercase px-6 py-2 text-l outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                New Deaths: {state.todayDeaths}
              </span>
              <span className="m-2.5 p-2.5 flex justify-center items-center text-gray-900 font-bold uppercase px-6 py-2 text-l outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                New Recovered: {state.todayRecovered}
              </span>
              <span className="m-2.5 p-2.5 flex justify-center items-center text-gray-900 font-bold uppercase px-6 py-2 text-l outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Critical Cases: {state.critical}
              </span>
              <span className="m-2.5 p-2.5 flex justify-center items-center text-gray-900 font-bold uppercase px-6 py-2 text-l outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Case Fatality: {state.caseFatality}%
              </span>
              <AiFillCloseCircle
                onClick={() => setToggle(false)}
                className="cursor-pointer text-red-600 rounded-full"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CovidWorldData;
