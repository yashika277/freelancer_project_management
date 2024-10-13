const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Middleware to protect routes by verifying the token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    try {
      token = req.cookies.token;

      // Decode the token to get user ID
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user and exclude the password from the response
      req.user = await User.findById(decodedToken.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Authorization failed, invalid token');
    }
  } else {
    // When no token is available in cookies
    res.status(401);
    throw new Error('Authorization failed, token missing');
  }
});

module.exports = { protect };
