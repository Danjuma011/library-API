const express = require('express');
const router = express.Router();
const { getBooks,createBook } = require('../controllers/book');

router.route('/').get(getBooks);
router.route('/newbook').post(createBook);

module.exports = router;
