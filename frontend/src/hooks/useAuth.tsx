import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { authService, User } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication context provider for BFF pattern
 * Manages user authentication state using session-based auth
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Request deduplication: track ongoing request to prevent race conditions
  const loadUserPromiseRef = useRef<Promise<void> | null>(null);

  /**
   * Load user information from session with request deduplication
   */
  const loadUser = async () => {
    // If there's already a request in progress, wait for it to complete
    if (loadUserPromiseRef.current) {
      console.log('loadUser: Request already in progress, waiting for completion');
      return loadUserPromiseRef.current;
    }

    // Create a new request promise
    const requestPromise = (async () => {
      try {
        setError(null);
        console.log('loadUser: Making /api/user request');
        const userData = await authService.getCurrentUser();
        setUser(userData);
        console.log('loadUser: Successfully loaded user data');
      } catch (error) {
        setUser(null);
        console.log('User not authenticated:', error);
        // Don't set error for normal "not authenticated" cases
        // This is expected when user hasn't logged in yet
      } finally {
        setIsLoading(false);
        // Clear the promise reference when request is complete
        loadUserPromiseRef.current = null;
      }
    })();

    // Store the promise to prevent concurrent requests
    loadUserPromiseRef.current = requestPromise;
    return requestPromise;
  };

  /**
   * Initialize authentication state on component mount
   */
  useEffect(() => {
    loadUser();
  }, []);

  /**
   * Handle login initiation
   */
  const login = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await authService.initiateLogin();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка входа';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  /**
   * Handle logout
   */
  const logout = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await authService.logout();
      setUser(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка выхода';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refresh user information
   */
  const refreshUser = async () => {
    // loadUser уже управляет состоянием isLoading и имеет дедупликацию
    await loadUser();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user?.authenticated,
    login,
    logout,
    refreshUser,
    error,
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use authentication context
 * Must be used within AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * HOC to protect routes that require authentication
 */
interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback = <div>Требуется авторизация</div> 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  console.log('ProtectedRoute render:', { isAuthenticated, isLoading, hasUser: !!user });

  if (isLoading) {
    console.log('ProtectedRoute: showing loading');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600">Загрузка...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: not authenticated, showing fallback');
    return <>{fallback}</>;
  }

  console.log('ProtectedRoute: authenticated, showing children');
  return <>{children}</>;
};

export default useAuth;