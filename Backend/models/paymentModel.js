const mongoose = require('mongoose');

// Define a schema for payment records
const paymentSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // Link to the associated project
  amount: { type: Number, required: true }, // Total payment amount
  status: { type: String, default: 'Pending' }, // Current status of the payment, defaults to 'Pending'
});

// Create and export the Payment model based on the defined schema
module.exports = mongoose.model('Payment', paymentSchema);
