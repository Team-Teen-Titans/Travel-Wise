const cookieController = {};

cookieController.setCookie = (req, res, next) => {
	res.cookie('hi', 'bye', {
		expires: new Date(Date.now() + 120000000),
		httpOnly: true,
	});
	return next();
};

module.exports = cookieController;
