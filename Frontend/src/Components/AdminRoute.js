import React from 'react';
import { Navigate } from 'react-router-dom';

// Admin route protection component
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user exists and has 'admin' role
  if (!user || user.role !== 'admin') {
    // Redirect non-admins to the login page
    return <Navigate to="/login" />;
  }

  // If admin, render the children (admin components)
  return children;
};

export default AdminRoute;
