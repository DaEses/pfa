import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();

      // Handle unsuccessful login response
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user type for dashboard redirection
      localStorage.setItem('userType', data.user.role);
      localStorage.setItem('token', data.token);  // Use data.token
      localStorage.setItem('user', JSON.stringify(data.user));

      // Use the login function from AuthContext
      login(data.token);

      // Redirect based on user role
      if (data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (data.user.role === 'provider') {
        navigate('/provider-dashboard');
      } else {
        navigate('/customer-dashboard');
      }
      
    } catch (err) {
      console.error("Login error:", err); // Log the error for debugging
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-container">
          <h1>Login to SkillBridge</h1>
          <p>Welcome back! Please enter your details.</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            
            <div className="form-footer">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block" 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          
          <div className="auth-links">
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          </div>
        </div>
        
        <div className="auth-image">
          <div className="auth-image-overlay">
            <h2>Access thousands of services at your fingertips</h2>
            <p>Join our community of service providers and customers today.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
