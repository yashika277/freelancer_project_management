// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cookieParser = require('cookie-parser');

// Initialize environment variables from .env file
dotenv.config();

// Establish a connection to the MongoDB database
connectDB();

const app = express();

// Use cookie parser middleware
app.use(cookieParser());

// Middleware to handle JSON payloads in requests
app.use(express.json());

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/payments', paymentRoutes);

// Set the port for the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
