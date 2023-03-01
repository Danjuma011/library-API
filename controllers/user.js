const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: 'Please provide email and password' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: 'invalid credentials' });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).send({ message: 'invalid credentials' });
  }
  const token = user.createJWT();
  res.status(200).json({ user: { name: user.name }, token });
};

module.exports = {registerUser,login};