const Project = require('../models/projectModel'); // Import the Project model
const csvParser = require('csv-parser'); // Import csv-parser for reading CSV files
const { Parser } = require('json2csv'); // Import json2csv for converting JSON to CSV
const fs = require('fs'); // Import file system module for file operations

// Function to export projects to a CSV file
const exportProjectsToCSV = async (res) => {
  try {
    const projects = await Project.find(); // Fetch all projects from the database
    const fields = ['name', 'description', 'status']; // Specify fields to include in the CSV
    const json2csvParser = new Parser({ fields }); // Initialize the JSON to CSV parser
    const csv = json2csvParser.parse(projects); // Convert projects to CSV format
    
    // Set response headers for CSV download
    res.header('Content-Type', 'text/csv');
    res.attachment('projects.csv'); // Name of the CSV file
    res.send(csv); // Send the CSV data
  } catch (error) {
    console.error('Error exporting projects:', error); // Log any error that occurs
    res.status(500).json({ message: 'Failed to export projects.' }); // Send an error response
  }
};

// Function to import projects from a CSV file
const importProjectsFromCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const projects = []; // Array to hold imported projects

    fs.createReadStream(filePath) // Read the CSV file
      .pipe(csvParser()) // Parse CSV data
      .on('data', (row) => projects.push(row)) // Push each row to the projects array
      .on('end', async () => {
        try {
          await Project.insertMany(projects); // Insert imported projects into the database
          resolve(); // Resolve the promise on successful import
        } catch (error) {
          reject(error); // Reject the promise if an error occurs during insertion
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error); // Log read error
        reject(error); // Reject the promise on read error
      });
  });
};

// Export functions for use in other modules
module.exports = { exportProjectsToCSV, importProjectsFromCSV };
