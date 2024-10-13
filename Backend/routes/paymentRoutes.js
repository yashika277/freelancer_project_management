// paymentRoutes.js
const express = require('express'); // Importing the express framework
const { protect } = require('../middlewares/authMiddleware'); // Importing the authentication middleware
const { markPaymentAsPaid, createPayment, getPayments } = require('../controllers/paymentController'); // Importing payment controller functions

const router = express.Router(); // Creating an instance of the router

// Define routes for payment operations
router
  .route('/') // Base route for payments
  .get(protect, getPayments) // Retrieve all payments with protection
  .post(protect, createPayment); // Create a new payment with protection

router.put('/:id/pay', protect, markPaymentAsPaid); // Mark a specific payment as paid with protection

// Export the router for use in other parts of the application
module.exports = router;
