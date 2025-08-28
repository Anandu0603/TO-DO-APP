import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import '../styles/Auth.css';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);

  // Validate form whenever email or password changes
  useEffect(() => {
    setFormValid(email.trim() !== '' && password.trim().length >= 6);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!formValid) return;
    
    setIsLoading(true);

    try {
      if (isLogin) {
        await authService.login(email, password);
        setMessage('Logged in successfully!');
        // Small delay to show success message before redirect
        setTimeout(() => onAuthSuccess(), 1000);
      } else {
        const result = await authService.register(email, password);
        if (result.requiresConfirmation) {
          setMessage('Registration successful! Please check your email to confirm your account.');
          // Auto-switch to login after registration
          setTimeout(() => {
            setIsLogin(true);
            setEmail('');
            setPassword('');
          }, 2000);
        } else {
          setMessage('Registration successful! You are now logged in.');
          setTimeout(() => onAuthSuccess(), 1000);
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      // More user-friendly error messages
      const errorMessage = err.message.includes('Invalid login credentials')
        ? 'Invalid email or password. Please try again.'
        : err.message.includes('already registered')
        ? 'This email is already registered. Please log in instead.'
        : 'An error occurred. Please try again.';
      
      setError(errorMessage);
      // Clear error after 5 seconds
      setTimeout(() => setError(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to continue to Task Manager' : 'Get started with your free account'}</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className="form-control"
              autoComplete={isLogin ? 'username' : 'email'}
            />
          </div>
          
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <label htmlFor="password">Password</label>
              {isLogin && (
                <a href="/forgot-password" className="text-sm text-primary">
                  Forgot password?
                </a>
              )}
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? 'Enter your password' : 'Create a password (min 6 characters)'}
              required
              minLength="6"
              disabled={isLoading}
              className="form-control"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          <button 
            type="submit" 
            disabled={!formValid || isLoading}
            className={`btn btn-primary ${isLoading ? 'btn-loading' : ''}`}
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="toggle-auth">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <a href="#" onClick={(e) => {
            e.preventDefault();
            setIsLogin(!isLogin);
            setError('');
            setMessage('');
          }}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
