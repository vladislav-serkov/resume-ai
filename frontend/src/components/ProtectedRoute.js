import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * Protected Route component that requires authentication
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, validateSession } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Validate session on protected route access
  React.useEffect(() => {
    if (isAuthenticated) {
      validateSession();
    }
  }, [isAuthenticated, validateSession]);

  // If not authenticated, redirect to login with return path
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // User is authenticated, render the protected component
  return children;
};

/**
 * Public Route component that redirects authenticated users
 * Used for login/register pages that shouldn't be accessible when logged in
 */
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is not authenticated, render the public component
  return children;
};

export default ProtectedRoute;