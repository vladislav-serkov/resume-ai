import { useCallback, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useSearchParams, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import VacancyPage from "./pages/VacancyPage";
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
        navigate('/app/dashboard');
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
  const convertUser = (hhUser: any): User => ({
    name: hhUser.name || `${hhUser.firstName || ''} ${hhUser.lastName || ''}`.trim() || hhUser.email,
    position: "Специалист", // We don't have position from hh.ru in this context
    avatar: hhUser.name ? hhUser.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : "U",
    email: hhUser.email
  });

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<OAuthCallback />} />
      
      {/* Protected Routes */}
      <Route 
        path="/app/dashboard" 
        element={
          <ProtectedRoute fallback={<Navigate to="/" replace />}>
            {user ? <Dashboard user={convertUser(user)} onLogout={handleLogout} /> : <div>Loading...</div>}
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/app/vacancy/:id" 
        element={
          <ProtectedRoute fallback={<Navigate to="/" replace />}>
            {user ? <VacancyPage user={convertUser(user)} onLogout={handleLogout} /> : <div>Loading...</div>}
          </ProtectedRoute>
        } 
      />
      
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