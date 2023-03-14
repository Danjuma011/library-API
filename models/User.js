const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be provided"],
  },
  email: {
    type: String,
    required: [true, "email must be provided"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password must be provided"],
  },
  created: {
    type: String,
    default: new Date().toISOString(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  books: [{}],
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id},
    process.env.JWT_SECRET,
    {
      expiresIn: '200h',
    }
  );
};

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', userSchema);
