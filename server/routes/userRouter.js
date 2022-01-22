const express = require('express');
const passport = require('passport');
const { checkAuthenticated, checkNotAuthenticated } = require('../controllers/sessionController');

const router = express.Router();

router.post('/login', checkNotAuthenticated, passport.authenticate('local.auth'), (req, res) => {
	// console.log('req user:', req.user);
	return res.status(200).send(req.user);
})

router.post('/logout', (req, res) => {
	// console.log('user object BEFORE:', req.user)
	req.session.destroy();
	// req.logout();
	// console.log('user object AFTER:', req.user)
	return res.status(200)
})

router.post('/signup', passport.authenticate('local.signup'), (req, res) => {
	return res.status(200).send(req.user);
});

router.get('/google/callback',
	passport.authenticate('google', {
		successRedirect: '/api/user/google-redirect',
		failureRedirect: '/api/user/google-failure'
	})
);

router.get('/protected', checkAuthenticated, (req, res) => {
	return res.status(200).send('youre in a protected route');
});

router.get('/logged-in', (req, res) => {
	console.log('hello from /logged-in', req.user)
	return res.status(200).send(req.user);
});

router.get('/google-redirect', (req, res) => {
	return res.redirect('http://localhost:8080');
});

router.get('/google-failure', (req, res) => {
	return res.redirect('http://localhost:8080/failure');
});

router.get('/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
)

module.exports = router;
