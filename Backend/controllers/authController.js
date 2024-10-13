const jwt = require('jsonwebtoken');
const User = require('../models/userModel');  
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/jwtUtils'); 

// Function to register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: 'User already registered' });
    return;
  }

  const newUser = await User.create({ name, email, password });
  if (newUser) {
    res.status(201).json({ 
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id) 
    });
  } else {
    res.status(400).json({ message: 'User data is invalid' });
  }
};

// Function to log in a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Look up user by email
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      // Generate auth token
      const token = generateToken(user._id);
  
      // Set cookie with token
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error('Email or password is incorrect');
    }
});

// Function to log out a user
const logoutUser = (req, res) => {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0), // Clear cookie immediately
    });
    
    res.status(200).json({ message: 'Successfully logged out' });
};

module.exports = { registerUser, loginUser, logoutUser };
