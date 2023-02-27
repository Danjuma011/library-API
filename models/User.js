const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: [{
    title: String,
    author: String,
    publishedDate: Date,
    // You can add more properties to the book schema as needed
  }]
});

module.exports = mongoose.model('User', userSchema);