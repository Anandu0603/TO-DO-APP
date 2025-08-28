# Models Directory

This directory contains the data models for the Task Manager application. These models handle the data layer of the application, providing an abstraction over the database operations.

## Files

- `Task.js`: Defines the Task model with methods for CRUD operations on tasks. This model works with both Supabase PostgreSQL database and fallback mock data when database credentials are not configured.

## Model Structure

Each model follows a similar pattern:

1. Database connection setup (Supabase client initialization)
2. Mock data for testing/development without a database
3. Static methods for data operations (getAll, getById, create, update, delete)
4. Consistent error handling and response formatting

## Task Model

The Task model represents a task in the system with the following properties:

- `id`: Unique identifier (UUID in database, string in mock data)
- `title`: Task title (required)
- `description`: Task description (optional)
- `status`: Task status ('pending' or 'done')
- `created_at`: Timestamp when the task was created

## Usage

The models are used by controllers to interact with the data layer. For example:

```javascript
const Task = require('../models/Task');

// Get all tasks
const { data, error } = await Task.getAll();

// Get task by ID
const { data, error } = await Task.getById(id);

// Create a new task
const { data, error } = await Task.create({ title, description, status });

// Update a task
const { data, error } = await Task.update(id, { title, description, status });

// Delete a task
const { success, error } = await Task.delete(id);
```