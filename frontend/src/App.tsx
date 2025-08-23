import { useCallback } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VacancyPage from "./pages/VacancyPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import ResponsesPage from "./pages/ResponsesPage";
import StatisticsPage from "./pages/StatisticsPage";
import PricingPage from "./pages/PricingPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { User } from "./types";

// Mock user data - since we removed authentication
const mockUser: User = {
  name: "Анна Иванова",
  position: "Frontend Developer", 
  avatar: "АИ",
  email: "anna@example.com"
};

/**
 * Main application component with sidebar-based navigation
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
          
          {/* Dashboard with nested routes */}
          <Route 
            path="/dashboard" 
            element={<DashboardLayout user={mockUser} onLogout={handleLogout} />}
          >
            <Route index element={<Navigate to="/dashboard/responses" replace />} />
            <Route path="responses" element={<ResponsesPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          {/* Vacancy page - simplified access */}
          <Route 
            path="/vacancy/:id" 
            element={<VacancyPage user={mockUser} onLogout={handleLogout} />} 
          />
          
          {/* Redirect all other routes to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard/responses" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;