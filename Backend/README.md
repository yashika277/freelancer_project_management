# Project Management API

## Overview

This API facilitates efficient management of projects and payment processes, incorporating features such as user authentication, project oversight, and bulk data handling for import/export.

## Key Features

- **User Authentication:** Secure login and registration with JWT.
- **Project Management:** Full CRUD (Create, Read, Update, Delete) capabilities for projects.
- **CSV Data Handling:** Easily import and export projects in CSV format.
- **Payment Processing:** Basic management functionalities for payments.

## Technology Stack

- Node.js
- Express
- MongoDB
- Mongoose
- json2csv
- multer

## Getting Started

1. **Clone the Repository**

   git clone 

2. **Navigate to the Project Folder**

  cd Freelancer_project_management

3. **Install Required Packages**

   npm install

4. **Configure Environment Variables**

   Create a .env file in the root directory and include your MongoDB connection string along with the JWT secret:

   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>

5. **Launch the Server**

   npm start

## API Endpoints

- **Login:** POST /api/auth/login
- **Project Management:**
- GET /api/projects - Retrieve all projects
- POST /api/projects - Add a new project
- PUT /api/projects/:id - Modify an existing project
- DELETE /api/projects/:id - Remove a project
- GET /api/projects/export/csv - Download projects as a CSV file
- POST /api/projects/import/csv - Upload projects from a CSV file

## Additional Information

- Use Postman to test the API.
- Make sure MongoDB is running.

