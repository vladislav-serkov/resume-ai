import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Initialize auth state on app start
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('userData');

        if (storedToken && storedUser) {
          const userData = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await apiService.auth.login(credentials);
      
      if (response.data.success) {
        const { user: userData, token: authToken } = response.data.data;
        
        // Store in localStorage
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Update state
        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);
        
        toast.success('Добро пожаловать!');
        return { success: true, user: userData };
      } else {
        throw new Error(response.data.message || 'Ошибка входа');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка входа';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await apiService.auth.register(userData);
      
      if (response.data.success) {
        const { user: newUser, token: authToken } = response.data.data;
        
        // Store in localStorage
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userData', JSON.stringify(newUser));
        
        // Update state
        setToken(authToken);
        setUser(newUser);
        setIsAuthenticated(true);
        
        toast.success('Регистрация успешна! Добро пожаловать!');
        return { success: true, user: newUser };
      } else {
        throw new Error(response.data.message || 'Ошибка регистрации');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка регистрации';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Clear state
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    toast.success('Вы успешно вышли из системы');
  };

  // Update user data
  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  // Check if token is expired (basic check)
  const isTokenExpired = () => {
    if (!token) return true;
    
    try {
      // Basic JWT expiration check (if token has exp claim)
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp) {
        return Date.now() >= payload.exp * 1000;
      }
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
    
    return false;
  };

  // Refresh token function (placeholder for future implementation)
  const refreshToken = async () => {
    // TODO: Implement token refresh when backend supports it
    console.log('Token refresh not implemented yet');
  };

  // Validate current session
  const validateSession = async () => {
    if (!token) {
      return false;
    }
    
    // Don't auto-logout on expired token
    if (isTokenExpired()) {
      return false;
    }
    
    try {
      // Optionally validate token with backend
      await apiService.profile.get();
      return true;
    } catch (error) {
      // Don't auto-logout on API errors
      return true;
    }
  };

  const value = {
    // State
    user,
    isAuthenticated,
    loading,
    token,
    
    // Actions
    login,
    register,
    logout,
    updateUser,
    
    // Utilities
    isTokenExpired,
    refreshToken,
    validateSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;