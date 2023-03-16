const express = require('express');
const router = express.Router();
const { getBooks,createBook,updateBook } = require('../controllers/book');

router.route('/').get(getBooks);
router.route('/createBook').post(createBook);
router.route('/:id').put(updateBook);

module.exports = router;
