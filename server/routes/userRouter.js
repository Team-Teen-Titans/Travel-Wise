const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

router.post('/login', userController.login, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
	return res.redirect('/');
});

router.post('/signup', userController.createUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
	return res.redirect('/');
});

router.get('/google/callback',
	passport.authenticate('google', {
		successRedirect: '/api/user/google-redirect',
		failureRedirect: '/api/user/google-failure'
	})
);

router.get('/protected', sessionController.isLoggedIn, (req, res) => {
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


module.exports = router;
