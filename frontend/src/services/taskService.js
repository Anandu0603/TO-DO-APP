import { supabase } from './authService';

// Helper function to handle Supabase errors
const handleError = (error, defaultMessage) => {
  console.error('Supabase error:', error);
  throw new Error(error.message || defaultMessage);
};

// Get all tasks for the current user
export const getAllTasks = async () => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Fetch tasks for the current user only
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)  // Filter by user_id
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    console.log('Fetched tasks:', data); // Debug log
    return data || [];
  } catch (error) {
    console.error('Error in getAllTasks:', error);
    return handleError(error, 'Failed to fetch tasks');
  }
};

// Get a single task by ID
export const getTaskById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    return handleError(error, `Failed to fetch task ${id}`);
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        ...taskData,
        status: 'pending',
        user_id: user.id,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) throw error;
    console.log('Created task:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error in createTask:', error);
    return handleError(error, 'Failed to create task');
  }
};

// Update a task
export const updateTask = async (id, taskData) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update(taskData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    return handleError(error, `Failed to update task ${id}`);
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { id };
  } catch (error) {
    return handleError(error, `Failed to delete task ${id}`);
  }
};
