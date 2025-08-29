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
}
// Export singleton instance
export const authService = new AuthService();