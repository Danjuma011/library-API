const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.registerUser);
router.post('/verifyEmail', authController.verifyEmail);
router.post('/regenerateToken', authController.regenerateOTP);
router.post('/login', authController.login);

module.exports = router;