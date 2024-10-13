const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

// Function to generate a JWT token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Set the token to expire in 30 days
  });
};

// Export the createToken function for use in other modules
module.exports = { createToken };
