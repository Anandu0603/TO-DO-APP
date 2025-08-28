import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm.jsx';
import TaskList from './TaskList.jsx';
import Auth from './Auth.jsx';
import { getAllTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import authService from '../services/authService';
import '../styles/App.css';

// Add a loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // State for current user

  // Check for authenticated user on component mount and set up auth state listener
  useEffect(() => {
    let subscription;

    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // First, check if we have a valid session
        const { data: { session } } = await authService.supabase.auth.getSession();
        const user = session?.user || null;
        
        setCurrentUser(user);
        
        if (user) {
          await fetchTasks();
        }
        
        // Set up auth state change listener
        const { data } = authService.supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event);
            const currentUser = session?.user || null;
            setCurrentUser(currentUser);
            
            if (currentUser) {
              await fetchTasks();
            } else {
              setTasks([]);
            }
          }
        );
        
        subscription = data?.subscription;
        
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError('Failed to initialize authentication. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Handle successful authentication
  const handleAuthSuccess = async () => {
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        await fetchTasks();
      }
    } catch (error) {
      console.error('Auth success error:', error);
      setError('Failed to complete authentication');
    }
  };

  // Fetch all tasks from the API
  const fetchTasks = async () => {
    if (!currentUser) return; // Only fetch if user is logged in
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (taskData) => {
    if (!currentUser) {
      setError('Please log in to add tasks.');
      return false;
    }
    try {
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
      return true;
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error(err);
      return false;
    }
  };

  // Toggle task status
  const toggleTaskStatus = async (id, currentStatus) => {
    if (!currentUser) {
      setError('Please log in to update tasks.');
      return;
    }
    try {
      const newStatus = currentStatus === 'pending' ? 'done' : 'pending';
      const updatedTask = await updateTask(id, { status: newStatus });
      
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error(err);
    }
  };

  // Remove a task
  const removeTask = async (id) => {
    if (!currentUser) {
      setError('Please log in to delete tasks.');
      return;
    }
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setTasks([]); // Clear tasks on logout
    setError(null);
    setLoading(false);
  };

  // Show loading spinner while checking auth state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show auth component if user is not logged in
  if (!currentUser) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>Task Manager</h1>
        </header>
        <main className="auth-container">
          <Auth onAuthSuccess={handleAuthSuccess} />
          {error && <div className="error-message">{error}</div>}
        </main>
      </div>
    );
  }

  // Show main app content if user is logged in
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        <div className="user-info">
          <span>Welcome, {currentUser.email}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>
      
      <main className="app-main">
        <TaskForm onAddTask={addTask} />
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading-message">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onToggleStatus={toggleTaskStatus} 
            onDeleteTask={removeTask} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
