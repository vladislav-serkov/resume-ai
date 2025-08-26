import { useCallback, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useSearchParams, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VacancyPage from "./pages/VacancyPage";
import ResponsesPage from "./pages/ResponsesPage";
import StatisticsPage from "./pages/StatisticsPage";
import PricingPage from "./pages/PricingPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import { User } from "./types";
import { AuthProvider, useAuth, ProtectedRoute } from "./hooks/useAuth";
import ErrorBoundary from "./components/ErrorBoundary";

/**
 * OAuth callback handler component
 */
const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const loginStatus = searchParams.get('login');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      navigate('/?error=' + error);
      return;
    }

    if (loginStatus === 'success') {
      // Refresh user data after successful OAuth
      refreshUser().then(() => {
        navigate('/app/response');
      });
    } else {
      navigate('/');
    }
  }, [searchParams, navigate, refreshUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Завершаем вход...</p>
      </div>
    </div>
  );
};

/**
 * Main application router component
 */
const AppRouter = () => {
  const { user, logout } = useAuth();

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  // Convert hh.ru user to our User type
  const convertUser = (hhUser: any): User => {
    if (!hhUser) {
      return {
        name: "Unknown User",
        position: "Специалист",
        avatar: "U",
        email: ""
      };
    }
    
    return {
      name: hhUser.name || `${hhUser.firstName || ''} ${hhUser.lastName || ''}`.trim() || hhUser.email || "Unknown User",
      position: "Специалист", // We don't have position from hh.ru in this context
      avatar: hhUser.name ? hhUser.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : "U",
      email: hhUser.email || ""
    };
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/callback" element={<OAuthCallback />} />
      
      {/* Protected App Routes */}
      <Route 
        path="/app"
        element={
          <ProtectedRoute fallback={<Navigate to="/" replace />}>
            <DashboardLayout user={convertUser(user)} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      >
        <Route path="response" element={<ResponsesPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="vacancy/:id" element={<VacancyPage user={convertUser(user)} onLogout={handleLogout} />} />
      </Route>
      
      {/* Redirect all other routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

/**
 * Main application component with OAuth authentication
 */
function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <BrowserRouter>
          <ErrorBoundary>
            <AuthProvider>
              <ErrorBoundary>
                <AppRouter />
              </ErrorBoundary>
            </AuthProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;