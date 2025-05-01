import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const userType = localStorage.getItem('userType');
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">SkillBridge</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          
          {isAuthenticated ? (
            <>
              <li>
                <Link 
                  to={
                    userType === 'admin'
                      ? '/admin-dashboard'
                      : userType === 'provider'
                        ? '/provider-dashboard'
                        : '/customer-dashboard'
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register" className="btn-signup">Get Started <i className="fas fa-arrow-right"></i></Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;