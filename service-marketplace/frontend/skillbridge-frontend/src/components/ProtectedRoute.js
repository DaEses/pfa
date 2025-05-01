import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated } = useAuth();
  const userRole = localStorage.getItem('userType');
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  
  // If a specific role is required and user doesn't have it
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    } else if (userRole === 'provider') {
      return <Navigate to="/provider-dashboard" />;
    } else {
      return <Navigate to="/customer-dashboard" />;
    }
  }
  
  // If authenticated and has required role (or no specific role is required)
  return children;
};

export default ProtectedRoute;