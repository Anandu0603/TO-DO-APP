import { supabase } from '../config/supabaseClient.js';

// Register User
export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // First, sign up the user with Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (signUpError) {
      console.error('Sign up error:', signUpError);
      throw signUpError;
    }

    // If email confirmation is required, authData.user will be null
    if (!authData.user) {
      return res.status(200).json({
        message: 'Registration successful! Please check your email to confirm your account.',
        requiresConfirmation: true
      });
    }

    // If email confirmation is not required or already confirmed
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username: authData.user.user_metadata?.username,
      },
      session: authData.session
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sign in the user with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return res.status(401).json({ 
        message: error.message.includes('Invalid login') 
          ? 'Invalid email or password' 
          : error.message 
      });
    }

    // If we get here, login was successful
    res.json({
      message: 'Login successful',
      user: {
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata?.username,
      },
      session: data.session
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login', 
      error: error.message 
    });
  }
};

// Logout User (client-side token removal)
export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// Protect routes
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Verify the token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.error('Auth error:', error);
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
    
    // Get additional user data if needed
    req.user = {
      id: user.id,
      email: user.email,
      username: user.user_metadata?.username
    };
    
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Not authorized, token verification failed' });
  }
};
