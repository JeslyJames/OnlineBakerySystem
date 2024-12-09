import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Components/UserContext';

const ProtectedRoute = ({ role, component: Component }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;
