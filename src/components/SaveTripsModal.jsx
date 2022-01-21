import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';

const SaveTripsModal = ({
	saveTripModalIsOpen,
	setSaveTripModalIsOpen,
	tripInfo,
	airportSelection,
	airportCodeFound,
}) => {
	const handleOnSubmit = async (e) => {
		e.preventDefault();

		const postStuff = {
			trip_nickname: e.target.nickname.value,
			origin_airport_list: airportSelection.originSelection,
			departure_airport_list: airportSelection.destinationSelection,
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
		console.log(saveFlightRequest.data);
	};

	return (
		<ReactModal
			isOpen={saveTripModalIsOpen}
			onRequestClose={() => setSaveTripModalIsOpen(false)}
			ariaHideApp={false}
		>
			<form onSubmit={handleOnSubmit}>
				<label>
					Enter a nickname for this trip:
					<input type='text' id='nickname' required />
				</label>
				<button type='submit'>Save</button>
			</form>
			<button onClick={() => setSaveTripModalIsOpen(false)}>Cancel</button>
		</ReactModal>
	);
};
export default SaveTripsModal;
