const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login', userController.login, (req, res) => {
	return res.status(200).json(res.locals.isMatch);
});

module.exports = router;
