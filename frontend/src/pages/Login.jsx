import React, { useState } from 'react';
import { Rocket, Eye, EyeOff, Facebook, Twitter, Github, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Add this import
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Add navigation hook

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    try {
      // Send login request to your backend API using Axios
      const response = await api.post('users/login', { email, password });

      if (response.status === 200) {
        // Successful login, save token to localStorage
        localStorage.setItem('authToken', response.data.token); // Assuming the token is in response.data.token
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        // Handle error if login fails
        setErrorMessage(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      {/* Left side with illustration */}
      <div className="login-illustration">
        <div className="logo">
          <Rocket className="logo-icon" />
          <span className="logo-text">Consent Manager</span>
        </div>
        
        <div className="illustration-container">
          <img 
            src="https://demos.themeselection.com/sneat-mui-nextjs-admin-template/demo-1/images/illustrations/characters-with-objects/7.png" 
            alt="Login illustration" 
            className="illustration-image"
          />
        </div>
        
        {/* Decorative elements */}
        <div className="decorative-shape shape-1"></div>
        <div className="decorative-shape shape-2"></div>
        <div className="decorative-shape shape-3"></div>
      </div>
      
      {/* Right side with login form */}
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h2 className="login-title">Welcome to Consent Manager! 👋</h2>
            <p className="login-subtitle">Please sign-in to your account and start the adventure</p>
          </div>
          
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email or Username</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email or username"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="············"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="icon" />
                  ) : (
                    <Eye className="icon" />
                  )}
                </button>
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox"
                />
                <label htmlFor="remember-me" className="checkbox-label">
                  Remember me
                </label>
              </div>

              <div className="forgot-password">
                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="form-submit">
              <button
                type="submit"
                className="login-button"
              >
                Login
              </button>
            </div>
          </form>
          
          <div className="login-footer">
            <div className="divider">
              <span className="divider-text">or</span>
            </div>

            <div className="social-login">
              <a href="#" className="social-icon">
                <Facebook />
              </a>
              <a href="#" className="social-icon">
                <Twitter />
              </a>
              <a href="#" className="social-icon">
                <Mail />
              </a>
              <a href="#" className="social-icon">
                <Github />
              </a>
            </div>
            
            <div className="signup-prompt">
              <span className="signup-text">New on our platform? </span>
              <a href="#" className="signup-link">
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
