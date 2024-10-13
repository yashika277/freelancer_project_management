const mongoose = require('mongoose');

// Schema definition for project entries
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the project
  description: { type: String, required: true }, // Brief description of the project
  status: { 
    type: String, 
    enum: ['Pending', 'Ongoing', 'Completed'], // Allowed statuses for the project
    default: 'Pending' // Default status is 'Pending'
  },
});

// Exporting the Project model derived from the schema
module.exports = mongoose.model('Project', projectSchema);
