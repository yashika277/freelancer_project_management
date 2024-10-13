// authRoutes.js
const express = require('express'); // Importing the express framework
const { registerUser, loginUser } = require('../controllers/authController'); // Importing authentication controller functions

const router = express.Router(); // Creating a new router instance

// Route for user registration
router.post('/register', registerUser); // Handle user registration requests

// Route for user login
router.post('/login', loginUser); // Handle user login requests

// Exporting the router to be used in other parts of the application
module.exports = router;
