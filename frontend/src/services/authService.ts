/**
 * Authentication service for BFF (Backend-for-Frontend) pattern
 * Works with session-based authentication using httpOnly cookies
 */

const API_BASE_URL = 'http://localhost:8080';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name: string;
  phone?: string;
  authenticated: boolean;
}

export interface AuthError {
  error: string;
  message?: string;
}

export interface AutoApplyRequest {
  searchQuery: string;
  maxApplications?: number;
}

export interface AutoApplyResponse {
  success: boolean;
  message: string;
  applicationsCount: number;
  applications: Array<{
    id: number;
    status: string;
    appliedAt: string;
    coverLetter: string;
    vacancy: {
      id: string;
      name: string;
      company: string;
      area: string;
      url: string;
      publishedAt: string;
    };
  }>;
}

/**
 * Auth service for session-based authentication
 * All requests include credentials (cookies) automatically
 */
class AuthService {
  /**
   * Get current authenticated user from session
   * Returns user data if authenticated, throws error if not
   */
  async getCurrentUser(): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user`, {
        method: 'GET',
        credentials: 'include', // Include session cookies
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'manual' // Don't follow redirects automatically
      });

      // Check if response was redirected (status 302, 3xx)
      if (response.type === 'opaqueredirect' || (response.status >= 300 && response.status < 400)) {
        throw new Error('Not authenticated');
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Not authenticated');
        }
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get user info');
        } catch {
          throw new Error('Failed to get user info');
        }
      }

      return await response.json();
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  /**
   * Get OAuth login redirect URL
   * Frontend will redirect user to this URL to start OAuth flow
   */
  async getLoginUrl(): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get login URL');
      }

      const data = await response.json();
      return `${API_BASE_URL}${data.redirectUrl}`;
    } catch (error) {
      console.error('Get login URL error:', error);
      throw error;
    }
  }

  /**
   * Initiate OAuth login by redirecting to hh.ru
   * This will redirect the entire page to start OAuth flow
   */
  async initiateLogin(): Promise<void> {
    try {
      const loginUrl = await this.getLoginUrl();
      window.location.href = loginUrl;
    } catch (error) {
      console.error('Login initiation error:', error);
      throw error;
    }
  }

  /**
   * Logout user and clear session
   * Redirects to frontend home page after logout
   */
  async logout(): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.warn('Logout request failed, but proceeding anyway');
      }

      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, redirect to home
      window.location.href = '/';
    }
  }

  /**
   * Check if user is authenticated
   * Returns true if session is valid, false otherwise
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Health check for auth service
   */
  async healthCheck(): Promise<{ status: string; authenticated: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Health check failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }

  /**
   * Auto-apply to vacancies
   * Sends a request to automatically apply to job vacancies
   */
  async autoApplyToVacancies(request: AutoApplyRequest): Promise<AutoApplyResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vacancies/auto-apply`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Not authenticated');
        }
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to auto-apply to vacancies');
        } catch {
          throw new Error('Failed to auto-apply to vacancies');
        }
      }

      return await response.json();
    } catch (error) {
      console.error('Auto-apply error:', error);
      throw error;
    }
  }

  /**
   * Get user's applications history
   */
  async getUserApplications(): Promise<{
    success: boolean;
    applicationsCount: number;
    applications: Array<{
      id: number;
      status: string;
      appliedAt: string;
      coverLetter: string;
      vacancy: {
        id: string;
        name: string;
        company: string;
        area: string;
        url: string;
        publishedAt: string;
      };
    }>;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vacancies/applications`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Not authenticated');
        }
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get applications');
        } catch {
          throw new Error('Failed to get applications');
        }
      }

      return await response.json();
    } catch (error) {
      console.error('Get applications error:', error);
      throw error;
    }
  }

  /**
   * Get applications statistics
   */
  async getApplicationsStats(): Promise<{
    success: boolean;
    stats: {
      total: number;
      sent: number;
      viewed: number;
      invited: number;
      rejected: number;
    };
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vacancies/applications/stats`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Not authenticated');
        }
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get applications stats');
        } catch {
          throw new Error('Failed to get applications stats');
        }
      }

      return await response.json();
    } catch (error) {
      console.error('Get applications stats error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;