import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import 'regenerator-runtime';
import ReactModal from 'react-modal';
import Loader from './Spinner';
import { data } from 'autoprefixer';

const FlightModal = ({ tripLocationInfo }) => {
  //component did mount needs to get airports
  //use effect to make axios call for airport
  const originSelected = tripLocationInfo.originCity;
  const destinationSelected = tripLocationInfo.destinationCity;

  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [airportSelection, setAirportSelection] = useState({
    originSelection: [],
    destinationSelection: [],
  });
  //this is top level state that will be used to fetch flight results
  const [tripInfo, setTripInfo] = useState({
    originAirport: null,
    destinationAirport: null,
    departureDate: null,
    returnDate: null,
    oneWayOrRound: null,
    numOfAdults: 1,
    numOfChildren: 0,
    numOfInfants: 0,
    cabinClass: 'Economy',
  });

  const originAirportsList =
    airportSelection.originSelection.length > 0 &&
    airportSelection.originSelection.map((code, i) => {
      return (
        <option key={i} value={code}>
          {code}
        </option>
      );
    });

  const destinationAirportsList =
    airportSelection.destinationSelection.length > 0 &&
    airportSelection.destinationSelection.map((code, i) => {
      return (
        <option key={i} value={code}>
          {code}
        </option>
      );
    });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const navigate = useNavigate();

  const getAirportCode = async (originCity, destinationCity) => {
    try {
      const originUrl = originCity.replace(/\s/g, '%20');
      const destinationUrl = destinationCity.replace(/\s/g, '%20');
      const originRes = await axios.get(`/api/flights/airport/${originUrl}`);
      const destinationRes = await axios.get(
        `/api/flights/airport/${destinationUrl}`
      );

      setAirportSelection({
        ...airportSelection,
        originSelection: originRes.data,
        destinationSelection: destinationRes.data,
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAirportCode(originSelected, destinationSelected);
  }, []);

  const handleChange = (type) => (e) => {
    // const { name, value } = e.target;
    // setTripInfo({ ...tripInfo, oneWayOrRound: type });
    // setTripInfo({ ...tripInfo, [name]: value });
    let removedText;
    switch (type) {
      case 'onewaytrip':
        setTripInfo({ ...tripInfo, oneWayOrRound: type });
        break;
      case 'roundtrip':
        setTripInfo({ ...tripInfo, oneWayOrRound: type });
        break;
      case 'originAirport':
        setTripInfo({ ...tripInfo, originAirport: e.target.value });
        break;
      case 'destinationAirport':
        setTripInfo({ ...tripInfo, destinationAirport: e.target.value });
        break;
      case 'departureDate':
        setTripInfo({ ...tripInfo, departureDate: e.target.value });
        break;
      case 'returnDate':
        setTripInfo({ ...tripInfo, returnDate: e.target.value });
        break;
      case 'numOfAdults':
        removedText = e.target.value.replace(/\D+/g, '');
        if (removedText === '') removedText = 0;
        setTripInfo({ ...tripInfo, numOfAdults: removedText });
        break;
      case 'numOfChildren':
        removedText = e.target.value.replace(/\D+/g, '');
        if (removedText === '') removedText = 0;
        setTripInfo({ ...tripInfo, numOfChildren: removedText });
        break;
      case 'numOfInfants':
        removedText = e.target.value.replace(/\D+/g, '');
        if (removedText === '') removedText = 0;
        setTripInfo({ ...tripInfo, numOfInfants: removedText });
        break;
      case 'cabinClass':
        setTripInfo({ ...tripInfo, cabinClass: e.target.value });
        break;
      default:
        console.log('handleChange ran', type);
    }
  };

  const handleSubmit = () => {
    console.log('trip info on submit: ', tripInfo);
    closeModal();
    // navigate('/**insert route**', {
    //   state: {
    //     ...tripInfo,
    //   },
    // });
    //where should we direct from here to show cards? flights?
  };

  //sets minimum departure date to today
  const minDate = new Date().toLocaleDateString('en-CA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  //sets minimum return date to today+1
  const findRoundTripMinDate = (date) => {
    const minDate = date.split('');
    const changeDay = +minDate[minDate.length - 1] + 1;
    minDate[minDate.length - 1] = changeDay;
    return minDate.join('');
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div className='place-center'>
            <h3>Type of trip?</h3>
            <span>
              <button
                onClick={handleChange('onewaytrip')}
                className='rounded-md py-2.5 px-2.5 m-1 text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-600 shadow-md scale-90 focus:outline-none focus:ring focus:ring-blue-300'
                id='one-way'
              >
                One Way
              </button>
              {' or '}
              <button
                onClick={handleChange('roundtrip')}
                className='rounded-md py-2.5 px-2.5 m-1 text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-600 shadow-md scale-90 focus:outline-none focus:ring focus:ring-blue-300'
                id='round-trip'
              >
                Round Trip
              </button>
            </span>

            <br />
            <br />

            <span>
              <label htmlFor='departure-date'>Departure Date: </label>
              <input
                type='date'
                name='departure'
                className='border 1px rounded'
                min={minDate}
                onChange={handleChange('departureDate')}
              ></input>
              {'  '}
              <label htmlFor='return-date'>Return Date: </label>
              <input
                type='date'
                name='return'
                className='border 1px rounded'
                min={findRoundTripMinDate(minDate)}
                onChange={handleChange('returnDate')}
              ></input>
            </span>
            <br />
            <br />
            <span>
              <label htmlFor='origin-airport'>Departure Airport: </label>
              <select
                htmlFor='originSelection'
                name='originSelection'
                className='border 1px rounded'
                onChange={handleChange('originAirport')}
              >
                {originAirportsList}
              </select>
              {'  '}
              <label htmlFor='destination-airport'>Arrival Airport: </label>
              <select
                htmlFor='destinationSelection'
                name='destinationSelection'
                className='border 1px rounded'
                onChange={handleChange('destinationAirport')}
              >
                {destinationAirportsList}
              </select>
            </span>

            <br />
            <br />
            <label htmlFor='cabinClass'>Cabin Class: </label>
            <span>
              <select
                onChange={handleChange('cabinClass')}
                className='border 1px rounded'
              >
                <option value='Economy'>Economy</option>
                <option value='Business'>Business</option>
                <option value='First'>First</option>
                <option value='Premium_Economy'>Premium Economy</option>
              </select>
            </span>
            <br />
            <br />
            <span>
              <h3>Passenger Information</h3>
            </span>
            <span>
              <label htmlFor='numOfAdults'>Adults: </label>
              <input
                htmlFor='numOfAdults'
                // type="number"
                defaultValue='1'
                name='number of adults'
                className='border 1px rounded'
                onChange={handleChange('numOfAdults')}
              ></input>
              {'  '}
              <label htmlFor='numOfChildren'>Children: </label>
              <input
                htmlFor='numOfChildren'
                defaultValue='0'
                name='number of children'
                className='border 1px rounded'
                onChange={handleChange('numOfChildren')}
              ></input>
              {'  '}
              <label htmlFor='numOfInfants'>Infants: </label>
              <input
                htmlFor='numOfInfants'
                // type="number"
                defaultValue='0'
                name='number of infants'
                className='border 1px rounded'
                onChange={handleChange('numOfInfants')}
              ></input>
            </span>

            <br />
            <br />
            <button
              onClick={handleSubmit}
              className='rounded-md py-2.5 px-2.5 m-1 bg-green-500 text-white hover:bg-opacity-75 active:shadow-md scale-90'
            >
              Search Flights Now
            </button>
            <button onClick={closeModal} className='rounded-md py-2.5 px-2.5 m-1 bg-gray-500 text-white hover:bg-opacity-75 active:shadow-md scale-90'>Cancel</button>

          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default FlightModal;
