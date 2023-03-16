const express = require('express');
const router = express.Router();
const { getBooks,createBook,updateBook, deleteBook } = require('../controllers/book');

router.route('/').get(getBooks);
router.route('/createBook').post(createBook);
router.route('/:id').put(updateBook).delete(deleteBook);

module.exports = router;
