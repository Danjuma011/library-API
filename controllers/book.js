const Book = require('../models/Book');
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ nbBooks: books.length, books });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getBooks };
