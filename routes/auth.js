const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers['authorization'];

  // Check if token exists
  if (!token) {
    return res.status(401).send({ message: 'Authentication token is missing' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, 'your-secret-key');

    // Add the decoded user object to the request object
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};

module.exports = authMiddleware;
