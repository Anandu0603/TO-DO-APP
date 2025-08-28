import * as Task from '../models/Task.js';


// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { data, error } = await Task.getAll(userId);

    if (error) {
      return res.status(500).json({ error });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { data, error } = await Task.getById(id, userId);

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
export const createTask = async (req, res) => {
  try {
    const { title, description, status = 'pending' } = req.body;
    const userId = req.user?.id;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const { data, error } = await Task.create({ title, description, status, user_id: userId });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user?.id;
    const { data, error } = await Task.update(id, { title, description, status, user_id: userId });

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
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { success, error } = await Task.deleteTask(id, userId);

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