require('dotenv').config();
const jwt = require('jsonwebtoken');

// Protection middleware
const protect = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded payload (e.g., user info) to req.user
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;
