const { hashPassword, comparePassword } = require('./../encryption');
const db = require('./../models/userModel');

const userController = {};

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

userController.signup = (req, res, next) => {
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
	const { usernameOrEmail, password } = req.body;
	if (!(usernameOrEmail || password)) {
		// potentially separate above line into 2 separate if statements which returns different errors based on what is missing
		res.locals.userForgotAField = true;
		return next();
	} else {
		if (usernameOrEmail.includes('@')) {
		}
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
userController.checkPassword = async (req, res, next) => {
	try {
		const { rawPassword, hashedPassword } = req.body;
		const isMatch = await bcrypt.compare(rawPassword, hashedPassword);
		res.locals.isMatch = isMatch; //this is a boolean value
		return next();
	} catch (err) {
		return next(err);
	}
};
