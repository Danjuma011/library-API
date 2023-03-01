const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/register', userController.registerUser);
// router.post('/login', userController.loginController);

module.exports = router;