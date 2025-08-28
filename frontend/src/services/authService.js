import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// Initialize supabase client
let supabase;

try {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or Key. Please check your environment variables.');
  }
  
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client initialized successfully');
} catch (error) {
  console.error('Failed to initialize Supabase:', error);
  throw error;
}

export { supabase };

const register = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: email.split('@')[0] // Use email prefix as username
        }
      }
    });
    
    if (error) throw error;
    
    // If email confirmation is required
    if (data.user && !data.session) {
      return { 
        requiresConfirmation: true, 
        message: 'Please check your email for a confirmation link.' 
      };
    }
    
    return data;
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error(error.message || 'Logout failed');
  }
};

const getCurrentUser = () => {
  return supabase.auth.getUser()
    .then(({ data: { user } }) => user)
    .catch(error => {
      console.error('Error getting current user:', error);
      return null;
    });
};

const getToken = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session?.access_token || null;
};

// Initialize auth state
const initAuth = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
  } catch (error) {
    console.error('Auth init error:', error);
    return null;
  }
};

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event);
  // You can add additional logic here if needed
});

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getToken,
  initAuth,
  supabase // Also include in the default export for backward compatibility
};

export default authService;
