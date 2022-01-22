import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import SubmitSearchButton from './SubmitSearchButton';
import axios from 'axios';

const TripCard = ({ savedTripInfo }) => {
	console.log('savedTripInfo:', savedTripInfo);

	const {
		trip_id: tripId,
		trip_nickname: tripNickname,
		origin_airport: originAirport,
		origin_airport_list,
		departure_airport: destinationAirport,
		departure_airport_list,
		departure_date: departureDate,
		return_date: returnDate,
		one_way_or_round: oneWayOrRound,
		num_of_adults: numOfAdults,
		num_of_children: numOfChildren,
		num_of_infants: numOfInfants,
		cabin_class: cabinClass,
	} = savedTripInfo;

	// parse stringified arrays
	const originAirportList = JSON.parse(origin_airport_list);
	const destinationAirportList = JSON.parse(departure_airport_list);

	//this is top level state that will be used to fetch flight results
	const [tripInfo, setTripInfo] = useState({
		originAirport: originAirport,
		destinationAirport: destinationAirport,
		departureDate: departureDate,
		returnDate: returnDate,
		oneWayOrRound: oneWayOrRound,
		numOfAdults: numOfAdults,
		numOfChildren: numOfChildren,
		numOfInfants: numOfInfants,
		cabinClass: cabinClass,
	});

	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [showFlightOptions, setShowFlightOptions] = useState(false);
	// populate origin airport codes list
	const originAirportOptions =
		originAirportList.length > 0 &&
		originAirportList.map((code, i) => {
			return (
				<option key={i} value={code}>
					{code}
				</option>
			);
		});

	// populate destination airport codes list
	const destinationAirportOptions =
		destinationAirportList.length > 0 &&
		destinationAirportList.map((code, i) => {
			return (
				<option key={i} value={code}>
					{code}
				</option>
			);
		});

	// update trip info when fields changed
	const handleChange = (type) => (e) => {
		let removedText;
		switch (type) {
			case 'oneWayOrRound':
				setTripInfo({ ...tripInfo, oneWayOrRound: e.target.value });
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
		console.log(Object.values(tripInfo));
		if (
			submitDisabled &&
			Object.values(tripInfo).every((field) => field !== null)
		) {
			setSubmitDisabled(false);
		}
	}, [tripInfo]);

	const navigate = useNavigate();

	const handleSubmit = () => {
		console.log('trip info on submit: ', tripInfo);
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

	const handleDelete = async (tripId) => {
		try {
			console.log('deleting trip id:', tripId);
			await axios.delete('/api/saved-flights/delete-saved-flights', {
				data: { tripId: tripId },
			});
			window.location.reload();
		} catch (err) {
			console.error('err in delete:', err);
		}
	};

	//sets minimum departure date to today
	// const minDate = new Date().toLocaleDateString('en-CA', {
	// 	day: '2-digit',
	// 	month: '2-digit',
	// 	year: 'numeric',
	// });

	return (
		<div>
			{/* trip type */}
			<div className='place-center bg-gray-200'>
				<h3 className='underline md:text-center text-xl font-semibold tracking-tight '>
					{tripNickname}
				</h3>
				<br />
				{showFlightOptions ? (
					<>
						<span>
							<select
								onChange={handleChange('oneWayOrRound')}
								className='border 1px rounded'
								value={tripInfo.oneWayOrRound}
							>
								<option value='onewaytrip'>One Way</option>
								<option value='roundtrip'>Round Trip</option>
							</select>
						</span>
						<br />
						<br />

						{/* dates */}
						<span>
							<label
								htmlFor='departure-date'
								className='text-base font-semibold text-xl tracking-tight'
							>
								Departure Date:{' '}
							</label>
							<input
								type='date'
								name='departure'
								className='border 1px rounded'
								min={minDate}
								onChange={handleChange('departureDate')}
								value={tripInfo.departureDate}
							></input>{' '}
							<label
								htmlFor='return-date'
								className='text-base font-semibold text-xl tracking-tight'
							>
								Return Date:{' '}
							</label>
							<input
								type='date'
								name='return'
								className='border 1px rounded'
								min={findRoundTripMinDate(minDate)}
								onChange={handleChange('returnDate')}
								value={tripInfo.returnDate}
							></input>
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
								value={tripInfo.originAirport}
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
								value={tripInfo.destinationAirport}
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
								value={tripInfo.cabinClass}
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
								value={tripInfo.numOfAdults}
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
								value={tripInfo.numOfChildren}
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
								value={tripInfo.numOfInfants}
							></input>
						</span>
					</>
				) : null}
				<br />
				<br />
				<SubmitSearchButton
					handleSubmit={handleSubmit}
					submitDisabled={submitDisabled}
				/>
				<button
					className='rounded-md py-2.5 px-2.5 m-1 bg-orange-500 text-white hover:bg-opacity-75 active:shadow-md scale-90'
					onClick={() => {
						showFlightOptions
							? setShowFlightOptions(false)
							: setShowFlightOptions(true);
					}}
				>
					{showFlightOptions ? 'Done' : 'Modify This Trip'}
				</button>
				<button
					className='rounded-md py-2.5 px-2.5 m-1 bg-red-500 text-white hover:bg-opacity-75 active:shadow-md scale-90'
					onClick={() => handleDelete(tripId)}
				>
					Delete
				</button>
			</div>
			<br></br>
		</div>
	);
};

export default TripCard;
