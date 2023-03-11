const express = require('express');
const router = express.Router();
const { getBooks } = require('../controllers/book');

router.route('/').get(getBooks);

module.exports = router;
