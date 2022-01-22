import React, { useState, useEffect } from 'react';
import TripCard from './TripCard';
import { Link } from 'react-router-dom';
import Loader from './Spinner';
import axios from 'axios';

const MyTrips = () => {
	const [loading, setLoading] = useState(true);
	const [myTripsList, setMyTripsList] = useState([]);

	// on mount pull users saved tripInfo searches from database and put into an array
	useEffect(() => {
		axios
			.get('/api/saved-flights/get-saved-flights')
			.then(({ data }) => {
				setMyTripsList(data);
			})
			.then(() => {
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	// render saved tripInfo
	return (
		<div>
			{loading ? (
				<div className='flex justify-center items-center pt-20'>
					<Loader />
				</div>
			) : (
				<div className='flex flex-col justify-center items-center py-3'>
					<h1 className='self-center text-3xl font-bold'>My Trips</h1>
					{myTripsList.map((savedTripInfo, index) => (
						<TripCard key={index} savedTripInfo={savedTripInfo} />
					))}
					{myTripsList.length === 0 && (
						<h3 className='pt-2'>
							{' '}
							No trips saved yet! Click{' '}
							<span className='text-indigo-700 font-semibold underline'>
								<Link to={'/'}>here</Link>
							</span>{' '}
							to search for flights.
						</h3>
					)}
				</div>
			)}
		</div>
	);
};

export default MyTrips;
