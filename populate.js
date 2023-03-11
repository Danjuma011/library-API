const mongoose = require('mongoose');
const Book = require('./models/Book');
const jsonBook = require('./books.json');
require('dotenv').config();

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://rasheedah:rasheedah@cluster0.pw3swto.mongodb.net/?retryWrites=true&w=majority'
    );
    await Book.deleteMany();
    await Book.create(jsonBook);
    console.log('connected');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
