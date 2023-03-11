const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title of book must be provided'],
  },
  author: {
    type: String,
    default: 'not available',
  },
  genre: {
    type: String,
    default: 'not available',
  },
  subGenre: {
    type: String,
    default: 'not available',
  },
  height: {
    type: String,
    default: 'not available',
  },
  publisher: {
    type: String,
    default: 'not available',
  },
});

module.exports = mongoose.model('Book', BookSchema);
