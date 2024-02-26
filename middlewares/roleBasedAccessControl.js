// Require the jsonwebtoken package to verify JWTs
const jwt = require('jsonwebtoken');

/**
 * The authorize function is a higher-order function that takes an array of roles
 * and returns a middleware function.
 * @param {Array} roles - An array of roles that are allowed to access the route.
 */
const authorize = roles => {
  // Return a middleware function that takes the standard Express.js middleware arguments: req, res, and next
  return (req, res, next) => {
    // Attempt to extract the token from the Authorization header
    // The token is expected to follow the format "Bearer [token]"
    // If there's no Authorization header, this will gracefully fail to undefined thanks to the optional chaining operator (?)
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'Token required' });

    // Verify the token using the JWT secret stored in environment variables
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // If there's an error verifying the token (e.g., it's expired or invalid), return a 401 Unauthorized response
      if (err) return res.status(401).json({ message: 'Unauthorized' });

      // If the decoded token's role is not in the list of allowed roles, return a 401 Unauthorized response
      if (!roles.includes(decoded.role)) {
        return res.status(401).json({ message: 'Insufficient permissions' });
      }

      // If the token is valid and the role is allowed, attach the decoded token to the req object
      // This allows downstream middleware or route handlers to access the user's information
      req.user = decoded;
      
      // Call next() to pass control to the next middleware function in the stack
      next();
    });
  };
};

module.exports = authorize;
