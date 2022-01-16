import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import 'regenerator-runtime';
import ReactModal from 'react-modal';
import Loader from './Spinner';

const FlightModal = ({ tripLocationInfo }) => {
  //component did mount needs to get airports
  //use effect to make axios call for airport
  const originSelected = tripLocationInfo.originCity;
  console.log(originSelected)
  const destinationSelected = tripLocationInfo.destinationCity;

  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //   const navigate = useNavigate();

  const getAirportCode = async (originCity, destinationCity) => {
    try {
      const originUrl = originCity.replace(/\s/g, '%20');
      const destinationUrl = destinationCity.replace(/\s/g, '%20');
      const originRes = await axios.get(`/api/flights/airport/${originUrl}`);
      const destinationRes = await axios.get(`/api/flights/airport/${destinationUrl}`);
      console.log(originRes);
    //   setTripInfo({...tripInfo, 
    //     originAirport : originRes.data, 
    //     destinationAirport : destinationRes.data});
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
      setTripInfo({ ...tripInfo, originAirport: e.target.value });     break;
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
    console.log('trip info state: ', tripInfo);
  };

  const handleSubmit = () => {
    console.log(tripInfo);
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

  

  return <div>
      <ReactModal />
  </div>;
};

export default FlightModal;
