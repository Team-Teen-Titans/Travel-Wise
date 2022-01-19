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
    navigate('/login');
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


};

export default FlightModal;
