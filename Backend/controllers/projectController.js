const Project = require('../models/projectModel');
const { exportProjectsToCSV, importProjectsFromCSV } = require('../services/csvService');
const fs = require('fs');
const csv = require('csv-parser');
const { Parser } = require('json2csv');

// Retrieve all projects
const getAllProjects = async (req, res) => {
  const allProjects = await Project.find();
  res.json(allProjects);
};

// Add a new project
const createProject = async (req, res) => {
  const { name, description, status } = req.body;

  const newProject = new Project({ name, description, status });
  await newProject.save();

  res.status(201).json(newProject);
};

// Modify an existing project
const updateProject = async (req, res) => {
  const { name, description, status } = req.body;

  const projectToUpdate = await Project.findById(req.params.id);
  if (!projectToUpdate) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }

  projectToUpdate.name = name || projectToUpdate.name;
  projectToUpdate.description = description || projectToUpdate.description;
  projectToUpdate.status = status || projectToUpdate.status;

  await projectToUpdate.save();
  res.json(projectToUpdate);
};

// Remove a project
const deleteProject = async (req, res) => {
  const projectToDelete = await Project.findById(req.params.id);
  if (!projectToDelete) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }

  await projectToDelete.remove();
  res.json({ message: 'Project successfully deleted' });
};

// Export projects as a CSV file
const exportProjects = async (req, res) => {
  try {
    const allProjects = await Project.find({});
    if (allProjects.length === 0) {
      return res.status(404).json({ message: 'No projects available.' });
    }
    const uniqueProjects = Array.from(new Map(allProjects.map(project => [project.name, project])).values());

    const json2csvParser = new Parser();
    const csvData = json2csvParser.parse(uniqueProjects);

    res.header('Content-Type', 'text/csv');
    res.attachment('projects.csv');
    res.send(csvData);
  } catch (error) {
    res.status(500).json({ message: 'Unable to export projects.', error: error.message });
  }
};

// Import projects from a CSV file
const importProjects = (req, res) => {
  const projectsToImport = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => projectsToImport.push(data))
    .on('end', async () => {
      try {
        for (const project of projectsToImport) {
          const existingProject = await Project.findOne({ name: project.name });
          if (!existingProject) {
            await Project.create(project);
          }
        }
        
        res.status(201).json({ message: 'Projects imported successfully.', count: projectsToImport.length });
      } catch (error) {
        res.status(500).json({ message: 'Import failed.', error: error.message });
      } finally {
        fs.unlinkSync(req.file.path);
      }
    });
};

module.exports = { getAllProjects, createProject, updateProject, deleteProject, exportProjects, importProjects };
