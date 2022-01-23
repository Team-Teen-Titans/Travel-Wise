import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import 'regenerator-runtime';
import ReactModal from 'react-modal';
import Loader from './Spinner';
import SubmitSearchButton from './SubmitSearchButton';
import SaveTripsModal from './SaveTripsModal';
// import { data } from 'autoprefixer';
import { MdError } from 'react-icons/md';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const FlightModal = ({ tripLocationInfo }) => {
	// console.log('tripLocationInfo in Modal:', tripLocationInfo)
	//component did mount needs to get airports
	//use effect to make axios call for airport
	const originSelected = tripLocationInfo.originCity;
	const destinationSelected = tripLocationInfo.destinationCity;
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [modalIsOpen, setModalIsOpen] = useState(true);
	const [saveTripModalIsOpen, setSaveTripModalIsOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [airportCodeFound, setAirportCodeFound] = useState(false);
	const [airportLists, setAirportLists] = useState({
		originAirportList: [],
		destinationAirportList: [],
	});
	//this is top level state that will be used to fetch flight results
	const [tripInfo, setTripInfo] = useState({
		originAirport: null,
		destinationAirport: null,
		departureDate: null,
		// returnDate: null,
		oneWayOrRound: 'one-way',
		numOfAdults: 1,
		numOfChildren: 0,
		numOfInfants: 0,
		cabinClass: 'Economy',
	});

	// const [submitDisabled, setSubmitDisabled] = useState(true);
	const [toggle, setToggle] = useState({ status: false });
	// on FlightModal component mount
	useEffect(() => {
		getAirportCode(originSelected, destinationSelected);
	}, []);

	// modal status
	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const getAirportCode = async (originCity, destinationCity) => {
		try {
			// get airport codes from api
			const originUrl = originCity.replace(/\s/g, '%20');
			const destinationUrl = destinationCity.replace(/\s/g, '%20');
			const originRes = await axios.get(`/api/flights/airport/${originUrl}`);
			const destinationRes = await axios.get(
				`/api/flights/airport/${destinationUrl}`
			);
			// update airport code lists
			setAirportLists({
				...airportLists,
				originAirportList: originRes.data,
				destinationAirportList: destinationRes.data,
			});
			// default selected airport code to first option
			setTripInfo({
				...tripInfo,
				originAirport: originRes.data[0],
				destinationAirport: destinationRes.data[0],
			});
			// done loading
			setLoading(false);

			if (originRes.data.length > 0 && destinationRes.data.length > 0) {
				setAirportCodeFound(true);
			}
		} catch (err) {
			console.error('err in getAirportCode func:', err);
		}
	};
	// populate origin airport codes options
	const originAirportOptions =
		airportLists.originAirportList.length > 0 &&
		airportLists.originAirportList.map((code, i) => {
			return (
				<option key={i} value={code}>
					{code}
				</option>
			);
		});

	// populate destination airport codes options
	const destinationAirportOptions =
		airportLists.destinationAirportList.length > 0 &&
		airportLists.destinationAirportList.map((code, i) => {
			return (
				<option key={i} value={code}>
					{code}
				</option>
			);
		});

	const handleToggle = (e) => {
		setToggle({ ...toggle, [e.target.name]: e.target.checked });
		let toggledTrip;
		if (toggle.status === true) {
			toggledTrip = 'one-way';
			const newTripObj = {...tripInfo};
			delete newTripObj.returnDate;
			setTripInfo({ ...newTripObj, oneWayOrRound: toggledTrip });
		} else {
			toggledTrip = 'round-trip';
			setTripInfo({ ...tripInfo, oneWayOrRound: toggledTrip });
		}

	};

	// update trip info when fields changed
	const handleChange = (type) => (e) => {
		let removedText;
		switch (type) {
			// case 'onewaytrip':
			//   setTripInfo({ ...tripInfo, oneWayOrRound: toggledTrip });
			//   break;
			// case 'roundtrip':
			//   setTripInfo({ ...tripInfo, oneWayOrRound: toggledTrip });
			//   break;
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
				setTripInfo({ ...tripInfo, numOfAdults: +removedText });
				break;
			case 'numOfChildren':
				removedText = e.target.value.replace(/\D+/g, '');
				if (removedText === '') removedText = 0;
				setTripInfo({ ...tripInfo, numOfChildren: +removedText });
				break;
			case 'numOfInfants':
				removedText = e.target.value.replace(/\D+/g, '');
				if (removedText === '') removedText = 0;
				setTripInfo({ ...tripInfo, numOfInfants: +removedText });
				break;
			case 'cabinClass':
				setTripInfo({ ...tripInfo, cabinClass: e.target.value });
				break;
			default:
				console.log('handleChange ran', type);
		}
	};

	// enable submit if there are no null fields
	useEffect(() => {
		console.log('checking fields');
		console.log(tripInfo);
		if (
			submitDisabled &&
			Object.values(tripInfo).every((field) => field !== null)
		) {
			setSubmitDisabled(false);
		}
	}, [tripInfo]);

	const navigate = useNavigate();

	const handleSubmit = () => {
		console.log('tripInfo on submit: ', tripInfo);
		closeModal();
		navigate('/flights-display', {
			state: {
				...tripInfo,
			},
		});
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
			) : airportCodeFound ? (
				<ReactModal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					ariaHideApp={false}
					className='bg-indigo-100 flex justify-center h-screen my-24 border-none focus:border-none'
				>
					{/* trip type */}
					<div className='place-center bg-indigo-100'>
						<h3 className='text-base font-semibold text-xl tracking-tight'>
							Staying or returning?
						</h3>
						{/* <span>
              <button
                onClick={handleChange("onewaytrip")}
                className="rounded-md py-2.5 px-2.5 m-1 text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-600 shadow-md scale-90 focus:outline-none focus:ring focus:ring-blue-300"
                id="one-way"
              >
                One Way
              </button>
              {" or "}
              <button
                onClick={handleChange("roundtrip")}
                className="rounded-md py-2.5 px-2.5 m-1 text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-600 shadow-md scale-90 focus:outline-none focus:ring focus:ring-blue-300"
                id="round-trip"
              >
                Round Trip
              </button>
            </span> */}
						<div className='space-x-1'>
							<p className='inline-block'>One-Way</p>
							<FormControlLabel
								className='inline-block'
								control={
									<Switch
										checked={toggle.status}
										onChange={handleToggle}
										color='primary'
										name='status'
									/>
								}
								label='Round Trip'
							/>
						</div>
						<br />
						{/* dates */}
						<span>
							<label
								htmlFor='departure-date'
								className='text-base font-semibold text-xl tracking-tight'
							>
								Departure Date:{' '}
							
								<input
									type='date'
									name='departure'
									className='border 1px rounded'
									min={minDate}
									onChange={handleChange('departureDate')}
								/>
							</label>{' '}
							{tripInfo.oneWayOrRound === 'round-trip' ? (<>
								<label
									htmlFor='return-date'
									className='text-base font-semibold text-xl tracking-tight'
								>
									Return Date:{' '}
								
									<input
										type='date'
										name='return'
										className='border 1px rounded'
										min={findRoundTripMinDate(minDate)}
										onChange={handleChange('returnDate')}
									/>
								</label>
							</>) : null}
						</span>
						<br />
						<br />

						{/* airports */}
						<span>
							<label
								htmlFor='origin-airport'
								className='text-base font-semibold text-xl tracking-tight'
							>
								Departure Airport:{' '}
							</label>
							<select
								htmlFor='originAirportList'
								name='originAirportList'
								className='border 1px rounded'
								onChange={handleChange('originAirport')}
							>
								{originAirportOptions}
							</select>{' '}
							<label
								htmlFor='destination-airport'
								className='text-base font-semibold text-xl tracking-tight'
							>
								Arrival Airport:{' '}
							</label>
							<select
								htmlFor='destinationAirportList'
								name='destinationAirportList'
								className='border 1px rounded'
								onChange={handleChange('destinationAirport')}
							>
								{destinationAirportOptions}
							</select>
						</span>
						<br />
						<br />
						{/* flight class */}
						<label
							htmlFor='cabinClass'
							className='text-base font-semibold text-xl tracking-tight'
						>
							Cabin Class:{' '}
						</label>
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

						{/* passengers */}
						<span>
							<h3 className='text-lg font-semibold text-xl tracking-tight'>
								Passenger Information:{' '}
							</h3>
						</span>
						<span>
							<label
								htmlFor='numOfAdults'
								className='text-base font-semibold text-xl tracking-tight'
							>
								Adults:{' '}
							</label>
							<input
								htmlFor='numOfAdults'
								// type="number"
								defaultValue='1'
								name='number of adults'
								className='border 1px rounded w-8'
								onChange={handleChange('numOfAdults')}
							></input>{' '}
							<label
								htmlFor='numOfChildren'
								className='text-base font-semibold text-xl tracking-tight'
							>
								Children:{' '}
							</label>
							<input
								htmlFor='numOfChildren'
								defaultValue='0'
								name='number of children'
								className='border 1px rounded w-8'
								onChange={handleChange('numOfChildren')}
							></input>{' '}
							<label
								htmlFor='numOfInfants'
								className='text-base font-semibold text-xl tracking-tigh'
							>
								Infants:{' '}
							</label>
							<input
								htmlFor='numOfInfants'
								// type="number"
								defaultValue='0'
								name='number of infants'
								className='border 1px rounded w-8'
								onChange={handleChange('numOfInfants')}
							></input>
						</span>
						<br />
						<br />
						<SubmitSearchButton
							handleSubmit={handleSubmit}
							submitDisabled={submitDisabled}
						/>
						<button
							onClick={closeModal}
							className='hover:text-green-300 border 1px rounded bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 font-bold text-white uppercase px-6 py-2 text-sm outline-none focus:outline-none hover:opacity-75 mr-1 mb-1 ease-linear transition-all duration-150'
						>
							Cancel
						</button>

						<button
							onClick={() => setSaveTripModalIsOpen(true)}
							className='hover:text-green-300 border 1px rounded bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 font-bold text-white uppercase px-6 ml-20 py-2 text-sm outline-none focus:outline-none hover:opacity-75 mr-1 mb-1 ease-linear transition-all duration-150'
						>
							Save trip
						</button>
					</div>
					<SaveTripsModal
						saveTripModalIsOpen={saveTripModalIsOpen}
						setSaveTripModalIsOpen={setSaveTripModalIsOpen}
						airportCodeFound={airportCodeFound}
						airportLists={airportLists}
						tripInfo={tripInfo}
					/>
				</ReactModal>
			) : (
				<ReactModal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					ariaHideApp={false}
				>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-auto my-6 mx-auto max-w-3xl'>
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								<div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
									<h3 className='text-3xl font-semibold'>Error</h3>
									<button
										className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
										onClick={closeModal}
									>
										<span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
											x
										</span>
									</button>
								</div>
								<div className='relative p-6 flex-auto'>
									<p className='my-4 text-blueGray-500 text-lg leading-relaxed'>
										There was an issue finding any airports located in your
										selected cities. Please try again.
									</p>
								</div>
								<div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
									<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
										<MdError
											className='h-6 w-6 text-red-600'
											aria-hidden='true'
										/>
									</div>
									<button
										className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										type='button'
										onClick={() => {
											closeModal();
										}}
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</ReactModal>
			)}
		</div>
	);
};

export default FlightModal;
