// projectRoutes.js
const express = require('express'); // Import express framework
const multer = require('multer'); // Import multer for file uploads
const { protect } = require('../middlewares/authMiddleware'); // Importing the protection middleware
const { 
  getAllProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  exportProjects, 
  importProjects 
} = require('../controllers/projectController'); // Import project-related controller functions

const router = express.Router(); // Instantiate the router
const upload = multer({ dest: 'uploads/' }); // Set up multer for file storage

// Define routes for project management
router.route('/') // Base route for projects
  .get(protect, getAllProjects) // Get all projects with authentication
  .post(protect, createProject); // Create a new project with authentication

router.route('/:id') // Route for specific project actions
  .put(protect, updateProject) // Update an existing project with authentication
  .delete(protect, deleteProject); // Delete a project with authentication

router.get('/export/csv', protect, exportProjects); // Route to export projects as CSV with authentication
router.post('/import/csv', protect, upload.single('file'), importProjects); // Route to import projects from a CSV file

// Export the router for use in the main application
module.exports = router;
