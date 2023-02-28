const userSchema = new mongoose.Schema({
  name: {
    type: String,
     required: [true, 'name must be provided'],
  },
  email: {
    type: String,
     required: [true, 'email must be provided'],
    unique: true,
  },
  password: {
    type: String,
     required: [true, 'password must be provided'],
  },
  books: [{}]
});

module.exports = mongoose.model('User', userSchema);