const Book = require('../models/Book');

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ nbBooks: books.length, books });
  } catch (error) {
    console.log(error);
  }
};

const createBook = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({message: `cannot create book with no title`})
  }
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author || 'not available',
      genre: req.body.genre || 'not available',
      subGenre: req.body.subGenre || 'not available',
      height: req.body.height || 'not available',
      publisher: req.body.publisher || 'not available',
    });
    const savedBook = await newBook.save();
    res.status(201).send({message: `created new book ${savedBook}`});
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { getBooks, createBook };
