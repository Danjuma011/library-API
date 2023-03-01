const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const loginController = require('../controllers/login');

router.post('/register', userController.registerUser);
router.post('/login', loginController);

module.exports = router;
