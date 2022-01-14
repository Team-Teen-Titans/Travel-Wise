const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
	const { ssid } = res.locals;
	res.cookie('ssid', ssid, {
		expires: new Date(Date.now() + 3600000),
		httpOnly: true,
		secure: true,
	});
	return next();
};

module.exports = cookieController;
