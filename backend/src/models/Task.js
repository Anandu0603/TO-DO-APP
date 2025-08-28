import { supabase } from '../config/supabaseClient.js';

// Mock data for testing when Supabase is not configured
let mockTasks = []; // No mock data for authenticated users

// Get all tasks for a specific user
export const getAll = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Get a single task by ID for a specific user
export const getById = async (id, user_id) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .eq('user_id', user_id)
      .single();

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Create a new task
export const create = async (taskData) => {
  try {
    const { title, description, status = 'pending', user_id } = taskData;

    if (!title) {
      return { error: 'Title is required' };
    }
    if (!user_id) {
      return { error: 'User ID is required' };
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description, status, user_id }])
      .select();

    if (error) throw error;
    return { data: data[0] };
  } catch (error) {
    return { error: error.message };
  }
};

// Update a task for a specific user
export const update = async (id, taskData) => {
  try {
    const { title, description, status, user_id } = taskData;

    const { data, error } = await supabase
      .from('tasks')
      .update({ title, description, status })
      .eq('id', id)
      .eq('user_id', user_id)
      .select();

    if (error) throw error;
    
    if (data.length === 0) {
      return { error: new Error('Task not found or not authorized') };
    }

    return { data: data[0] };
  } catch (error) {
    return { error: error.message };
  }
};

// Delete a task for a specific user
export const deleteTask = async (id, user_id) => {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', user_id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};
