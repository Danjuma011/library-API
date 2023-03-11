const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.delete('/delete-user', userController.deleteUser);
module.exports = router;