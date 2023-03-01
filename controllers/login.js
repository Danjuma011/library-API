const User = require('../models/User');

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

module.exports = login;
