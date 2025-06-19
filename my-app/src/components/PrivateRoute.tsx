import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './auth/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>; // 判定中ならブロックせず待つ
  }

  return currentUser ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
