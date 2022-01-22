import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import { AuthContext } from './App';

const SaveTripsModal = ({
	saveTripModalIsOpen,
	setSaveTripModalIsOpen,
	tripInfo,
	airportLists,
	airportCodeFound,
}) => {
	const isUserLoggedIn = useContext(AuthContext);
	const handleOnSubmit = async (e) => {
		e.preventDefault();

		const postStuff = {
			trip_nickname: e.target.nickname.value,
			origin_airport_list: airportLists.originAirportList,
			departure_airport_list: airportLists.destinationAirportList,
			origin_airport: tripInfo.originAirport,
			departure_airport: tripInfo.destinationAirport,
			departure_date: tripInfo.departureDate,
			return_date: tripInfo.returnDate,
			one_way_or_round: tripInfo.oneWayOrRound,
			num_of_adults: tripInfo.numOfAdults,
			num_of_children: tripInfo.numOfChildren,
			num_of_infants: tripInfo.numOfInfants,
			cabin_class: tripInfo.cabinClass,
		};
		const saveFlightRequest = await axios.post(
			'/api/saved-flights/save-flights',
			postStuff
		);
		setUserPressedSave(true);
		console.log(saveFlightRequest.data);
	};
	const [userPressedSave, setUserPressedSave] = useState(false);
	const modalStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	return (
		<ReactModal
			isOpen={saveTripModalIsOpen}
			onRequestClose={() => setSaveTripModalIsOpen(false)}
			ariaHideApp={false}
			style={modalStyles}
		>
			{!isUserLoggedIn ? (
				<div>You must be logged in</div>
			) : !userPressedSave ? (
				<div>
					<form onSubmit={handleOnSubmit}>
						<label>
							Enter a nickname for this trip:
							<input
								type='text'
								id='nickname'
								className='border 1px rounded rounded-md py-2.5 px-2.5 m-1 hover:bg-gray-100 focus:bg-blue-100'
								required
							/>
						</label>
						<br />
						<button
							className='rounded-md py-2.5 px-2.5 m-1 bg-blue-500 text-white hover:bg-opacity-75 active:shadow-md scale-90'
							type='submit'
						>
							Save
						</button>
						<button
							className='rounded-md py-2.5 px-2.5 m-1 bg-gray-500 text-white hover:bg-opacity-75 active:shadow-md scale-90'
							onClick={() => setSaveTripModalIsOpen(false)}
						>
							Cancel
						</button>
					</form>
				</div>
			) : (
				<>
					<div>Your flight has been saved</div>
					<button
						className='rounded-md py-2.5 px-2.5 m-1 bg-blue-500 text-white hover:bg-opacity-75 active:shadow-md scale-90'
						onClick={() => setSaveTripModalIsOpen(false)}
					>
						Okay
					</button>
				</>
			)}
		</ReactModal>
	);
};
export default SaveTripsModal;
