const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
	const { ssid } = res.locals;
	res.cookie('ssid', ssid, {
		expires: new Date(Date.now() + 120000000),
		httpOnly: true,
	});
	return next();
};

module.exports = cookieController;
