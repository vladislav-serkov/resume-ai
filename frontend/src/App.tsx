import { useCallback } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import VacancyPage from "./pages/VacancyPage";
import { User } from "./types";

// Mock user data - since we removed authentication
const mockUser: User = {
  name: "Анна Иванова",
  position: "Frontend Developer", 
  avatar: "АИ",
  email: "anna@example.com"
};

/**
 * Main application component with simplified routing (no authentication)
 */
function App() {
  /**
   * Handle user logout (redirects to landing page)
   */
  const handleLogout = useCallback(() => {
    window.location.href = '/';
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Dashboard - now accessible without authentication */}
          <Route 
            path="/dashboard" 
            element={<Dashboard user={mockUser} onLogout={handleLogout} />} 
          />
          
          {/* Vacancy page - simplified access */}
          <Route 
            path="/vacancy/:id" 
            element={<VacancyPage user={mockUser} onLogout={handleLogout} />} 
          />
          
          {/* Redirect all other routes to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;