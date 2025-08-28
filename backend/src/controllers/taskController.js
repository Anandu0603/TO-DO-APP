const Task = require('../models/Task');


// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const { data, error } = await Task.getAll();

    if (error) {
      return res.status(500).json({ error });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await Task.getById(id);

    if (error) {
      return res.status(500).json({ error });
    }

    if (!data) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status = 'pending' } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const { data, error } = await Task.create({ title, description, status });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const { data, error } = await Task.update(id, { title, description, status });

    if (error) {
      if (error === 'Task not found') {
        return res.status(404).json({ error });
      }
      return res.status(400).json({ error });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { success, error } = await Task.delete(id);

    if (error) {
      if (error === 'Task not found') {
        return res.status(404).json({ error });
      }
      return res.status(400).json({ error });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};