const db = require('../db-model/model');
const savedFlightsController = {};

savedFlightsController.getSavedFlights = async (req, res, next) => {
	const user_id = req.user.user_id;
	const querySavedFlights = await db.query(
		`SELECT * FROM flights WHERE user_id = $1`,
		[user_id]
	);
	res.locals.savedFlights = querySavedFlights.rows;

	return next();
};

savedFlightsController.saveFlights = async (req, res, next) => {
	console.log('req.user in saveFlights func:', req.user);
	// inserting into the flights table
	const {
		trip_nickname,
		origin_airport_list,
		origin_airport,
		departure_airport_list,
		departure_airport,
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
		origin_airport,
		departure_airport,
		JSON.stringify(origin_airport_list),
		JSON.stringify(departure_airport_list),
		departure_date,
		return_date,
		one_way_or_round,
		num_of_adults,
		num_of_children,
		num_of_infants,
		cabin_class,
	];
	const querySavedFlights = await db.query(
		`INSERT INTO flights (user_id, trip_nickname, origin_airport, departure_airport, origin_airport_list, departure_airport_list, departure_date, return_date, one_way_or_round, num_of_adults, num_of_children, num_of_infants, cabin_class)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
		params
	);

	return next();
};

savedFlightsController.deleteFlights = async (req, res, next) => {
	const user_id = req.user.user_id;
	const trip_id = req.body.tripId;
	const deleteSavedFlights = await db.query(
		`DELETE FROM flights WHERE user_id = $1 AND trip_id = $2`,
		[user_id, trip_id]
	);
	return next();
};

module.exports = savedFlightsController;
