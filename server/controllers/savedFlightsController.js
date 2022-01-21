const fs = require('fs');
const savedFlightsController = {};

savedFlightsController.getSavedFlights = async (req, res, next) => {
	const user_id = req.user.user_id;
	const querySavedFlights = await db.query(
		`SELECT * FROM flights WHERE user_id = $1`,
		[user_id]
	);
	res.locals.savedFlights = querySavedFlights.rows;
	// take the user id from the request body.
	// check it exists in our users table
	// make string query: select all from flight table where user id = user id passed in
	// take the data.rows from the database, and then send it back (or do something to data first)

	// return all the results for that user from the flights table
	// send info as a response
	return next();
};

savedFlightsController.saveFlights = async (req, res, next) => {
	// inserting into the flights table
	const {
		trip_nickname,
		origin_airports,
		departure_airports,
		departure_date,
		return_date,
		one_way_or_round,
		num_of_adults,
		num_of_children,
		num_of_infants,
		cabin_class,
	} = req.body;
	console.log(req.body);
	const user_id = req.user.user_id;
	const params = [
		user_id,
		trip_nickname,
		origin_airports,
		departure_airports,
		departure_date,
		return_date,
		one_way_or_round,
		num_of_adults,
		num_of_children,
		num_of_infants,
		cabin_class,
	];
	const querySavedFlights = await db.query(
		`INSERT INTO flights (user_id, trip_nickname, origin_airports, departure_airports, departure_date, return_date, one_way_or_round,num_of_adults, num_of_children, num_of_infants, cabin_class)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
		params
	);

	return next();
};

saveFlightsController.deleteFlights = async (req, res, next) => {
	const user_id = req.user.user_id;
	const flight_id = req.body.flight_id;
	const deleteSavedFlights = await db.query(
		`DELETE FROM flights WHERE user_id = $1 AND flight_id = $2`,
		[user_id, flight_id]
	);
	return next();
};

// create flights table - what data you need for flights database
// // receiving some front end info - ensure all valid fields are filled in
// then insert it into the flights table
