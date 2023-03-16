const Book = require('../models/Book');
const checkAdmin = require('../utils/checkAdmin')

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ nbBooks: books.length, books });
  } catch (error) {
    console.log(error);
  }
};

const createBook = async (req, res) => {
  const admin = await checkAdmin(req, res);
  if (!admin) return res.status(403).send({ message: 'Forbidden' })

  if (!req.body.title) {
    return res.status(400).send({message: `cannot create book with no title`})
  }
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author ,
      genre: req.body.genre ,
      subGenre: req.body.subGenre ,
      height: req.body.height ,
      publisher: req.body.publisher ,
    });
    const savedBook = await newBook.save();
    res.status(201).send({message: `created new book ${savedBook}`});
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  const admin = await checkAdmin(req, res);
  if (!admin) return res.status(403).send({ message: 'Forbidden' })
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const { title, author, genre, subGenre, height, publisher } = req.body;
    book.title = title ? title : book.title;
    book.author = author ? author : book.author;
    book.genre = genre ? genre : book.genre;
    book.subGenre = subGenre ? subGenre : book.subGenre;
    book.height = height ? height : book.height;
    book.publisher = publisher ? publisher : book.publisher;

    const updatedBook = await book.save();
    res.status(200).send(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
}

module.exports = { getBooks, createBook, updateBook };
