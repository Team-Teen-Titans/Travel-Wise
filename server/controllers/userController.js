const db = require('../db-model/model');

const userController = {};

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

userController.signup = async (req, res, next) => {
	// add logic so that username cannot contain '@' symbol

	if (
		!req.body.display_name ||
		!req.body.password ||
		!req.body.first_name ||
		!req.body.last_name ||
		!req.body.email
	) {
		console.log('Not all required fields are completed.');
		return next();
	} else {
		const { display_name, password, first_name, last_name, email } = req.body;
		try {
			const password = await hashPassword(password);
			const params = [display_name, password, first_name, last_name, email];
			//sql query to make new user

			const registration =
				'INSERT INTO users (display_name, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)';
			db.query(registration, params)
				.then((data) => {
					res.locals.newUser = data.rows;
					return next();
				})
				.catch((err) => {
					console.error(err);
					return next(err);
				});
		} catch (err) {
			console.error(err);
			return next(err);
		}
	}
};

userController.login = async (req, res, next) => {
	const { email, password } = req.body;
	if (!(email || password)) {
		// potentially separate above line into 2 separate if statements which returns different errors based on what is missing
		res.locals.userForgotAField = true;
		return next();
	} else {
		// check if email in database
		// if (email.includes('@')) {
		const queryToGrabHashedPassword = `SELECT password FROM users WHERE email = $1`;
		const paramForPassword = [email];
		db.query(queryToGrabHashedPassword, paramForPassword)
			.then(async (data) => {
				if (data.rowCount > 0) {
					try {
						const hashedPassword = data.rows[0].password;
						// console.log(hashedPassword);
						const isMatch = await bcrypt.compare(password, hashedPassword);
						res.locals.isMatch = isMatch; //this is a boolean value
						return next();
					} catch (err) {
						return next(err);
					}
				}
			})
			.catch((err) => {
				// console.log(err);
				return next(err);
			});

		// const queryToCheckEmail = `SELECT * FROM users WHERE email = $1`;
		// const params = [email];
		// db.query(queryToCheckEmail, params)
		// 	.then((data) => {
		// 		if (data.rowCount === 1) {
		// 			try {
		// 				const isMatch = await bcrypt.compare(password, hashedPassword);
		// 				res.locals.isMatch = isMatch; //this is a boolean value
		// 				return next();
		// 			} catch (err) {
		// 				return next(err);
		// 			}
		// 		}
		// 		return next({ message: "User doesn't exist" });
		// 	})
		// 	.catch((err) => next(err));
		// }
		// else {
		// 	const queryToCheckDisplayName = `SELECT * FROM users WHERE display_name = $1`;
		// 	const params = [email];
		// 	db.query(queryToCheckDisplayName, params)
		// 		.then((data) => {
		// 			if (data.rowCount === 1) {
		// 				try {
		// 					const isMatch = await bcrypt.compare(password, hashedPassword);
		// 					res.locals.isMatch = isMatch; //this is a boolean value
		// 					return next();
		// 				} catch (err) {
		// 					return next(err);
		// 				}
		// 			}
		// 			return next({ message: "User doesn't exist" });
		// 		})
		// 		.catch((err) => next(err));
		// }
		// check password after hashing
	}
};

userController.hashPassword = async (req, res, next) => {
	try {
		const { password } = req.body;
		// const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		const hashPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
		res.locals.hashPassword = hashPassword;
		return next();
	} catch (err) {
		return next(err);
	}
};
// userController.checkPassword = async (req, res, next) => {
// 	try {
// 		const { rawPassword, hashedPassword } = req.body;
// 		const isMatch = await bcrypt.compare(rawPassword, hashedPassword);
// 		res.locals.isMatch = isMatch; //this is a boolean value
// 		return next();
// 	} catch (err) {
// 		return next(err);
// 	}
// };
module.exports = userController;
