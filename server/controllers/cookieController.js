// const db = require('../db-model/model');

const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
	const { id } = res.locals;
	// console.log('ssid:', id);
	res.cookie('ssid', id, {
		expires: new Date(Date.now() + 3600000),
		httpOnly: true,
		secure: true,
	});
	return next();
};

module.exports = cookieController;