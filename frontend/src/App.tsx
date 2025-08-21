import { useState, useCallback } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import VacancyPage from "./pages/VacancyPage";
import ProfilePage from "./pages/ProfilePage";
import { User, AuthState, LoginHandler, LogoutHandler } from "./types";

/**
 * Main application component with routing and authentication state management
 */
function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  /**
   * Handle user login and set authentication state
   */
  const handleLogin: LoginHandler = useCallback((userData: User) => {
    setAuthState({
      isAuthenticated: true,
      user: userData
    });
  }, []);

  /**
   * Handle user logout and clear authentication state
   */
  const handleLogout: LogoutHandler = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      user: null
    });
  }, []);

  const { isAuthenticated, user } = authState;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            } 
          />
          
          <Route 
            path="/register" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <RegisterPage onRegister={handleLogin} />
              )
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated && user ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          <Route 
            path="/vacancy/:id" 
            element={
              isAuthenticated && user ? (
                <VacancyPage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              isAuthenticated && user ? (
                <ProfilePage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          {/* Redirect all other routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;