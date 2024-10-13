const Payment = require('../models/paymentModel');
const Project = require('../models/projectModel');

// Function to mark a payment as paid
const markPaymentAsPaid = async (req, res) => {
  const { id } = req.params;
  const paymentRecord = await Payment.findById(id);
  
  if (!paymentRecord) {
    res.status(404).json({ message: 'Payment record not found' });
    return;
  }

  paymentRecord.status = 'Paid';
  await paymentRecord.save();
  res.json({ message: 'Payment status updated to paid' });
};

// Function to create a new payment for a project
const createPayment = async (req, res) => {
  const { projectId, amount } = req.body;

  const projectRecord = await Project.findById(projectId);
  if (!projectRecord) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }

  const newPayment = new Payment({ projectId, amount, status: 'Pending' });
  await newPayment.save();

  res.status(201).json(newPayment);
};

// Function to retrieve all payments
const getPayments = async (req, res) => {
  const allPayments = await Payment.find();
  res.json(allPayments);
};

module.exports = { markPaymentAsPaid, createPayment, getPayments };
