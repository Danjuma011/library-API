const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.delete('/:userId', userController.deleteUser);
module.exports = router;