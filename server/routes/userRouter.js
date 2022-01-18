const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

// router.post('/login', /*userController.login, sessionController.startSession, cookieController.setSSIDCookie,*/ (req, res) => {
// 	return res.redirect('/');
// });

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/api/user/failure',
	// failureFlash: true
}))

router.get('/failure', checkNotAuthenticated, (req, res) => {
	return res.render('/signup');
});

// router.get('/success', /*sessionController.isLoggedIn,*/(req, res) => {
// 	return res.redirect('http://localhost:8080/');
// });

router.post('/signup', /*userController.createUser, sessionController.startSession, cookieController.setSSIDCookie,*/(req, res) => {
	return res.redirect('/');
});

router.get('/google/callback',
	passport.authenticate('google', {
		successRedirect: '/api/user/google-redirect',
		failureRedirect: '/api/user/google-failure'
	})
);

router.get('/protected', /*sessionController.isLoggedIn*/checkAuthenticated, (req, res) => {
	return res.status(200).send('youre in a protected route');
});
router.get('/google-redirect', /*sessionController.isLoggedIn,*/(req, res) => {
	return res.redirect('http://localhost:8080');
});

router.get('/google-failure', /*sessionController.isLoggedIn,*/(req, res) => {
	return res.redirect('http://localhost:8080/failure');
});

router.get('/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
)

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}

	res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/')
	}
	console.log('im in checkNotAuthenticated function. we\'re NOT authenticated')
	return next()
}

module.exports = router;
