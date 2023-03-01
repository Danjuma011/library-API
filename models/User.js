const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  books: [{}],
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', userSchema);
