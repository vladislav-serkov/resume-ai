## Relevant Files

- `frontend/src/services/api.js` - Centralized API service module for all backend communications
- `frontend/src/services/auth.js` - Authentication service with JWT token management
- `frontend/src/hooks/useAuth.js` - Custom hook for authentication state management
- `frontend/src/hooks/useApi.js` - Custom hook for API operations with loading states
- `frontend/src/contexts/AuthContext.js` - React Context for global authentication state
- `frontend/src/components/ErrorBoundary.js` - Error boundary component for API error handling
- `frontend/src/utils/errorHandler.js` - Utility functions for error handling and toast notifications
- `backend/src/controllers/settingsController.ts` - User settings management controller
- `backend/src/routes/settings.ts` - User settings API routes
- `backend/src/controllers/aiController.ts` - AI analysis mock controller
- `backend/src/routes/ai.ts` - AI analysis API routes

### Notes

- API service will use Axios with interceptors for request/response handling
- Authentication context will manage JWT tokens and user state globally
- Error handling will use existing Sonner toast system for notifications
- Loading states will be managed through custom hooks

## Tasks

- [x] 1.0 Setup API Service Infrastructure
  - [x] 1.1 Create centralized API service module with Axios configuration
  - [x] 1.2 Implement request/response interceptors for token handling
  - [x] 1.3 Add error handling interceptors with toast notifications
  - [x] 1.4 Create custom useApi hook for loading states and error handling
  - [x] 1.5 Set up API base URL configuration for development/production

- [x] 2.0 Implement Authentication Integration
  - [x] 2.1 Create AuthContext for global authentication state management
  - [x] 2.2 Implement JWT token storage in localStorage
  - [x] 2.3 Create useAuth hook for authentication operations
  - [x] 2.4 Update login/register pages to use backend authentication
  - [x] 2.5 Implement protected route middleware with token validation
  - [x] 2.6 Add automatic logout on token expiration

- [x] 3.0 Create Missing Backend Endpoints
  - [x] 3.1 Create user settings management endpoints (GET/PUT /api/settings)
  - [x] 3.2 Create AI vacancy analysis endpoint (POST /api/ai/analyze-vacancy)
  - [x] 3.3 Create file upload mock endpoint (POST /api/resumes/upload)
  - [x] 3.4 Enhance vacancy search with advanced filters
  - [x] 3.5 Add bulk notification operations (PUT /api/notifications/mark-all-read)

- [x] 4.0 Integrate Dashboard with Backend
  - [x] 4.1 Connect vacancy search to backend API with filters
  - [x] 4.2 Integrate user statistics from backend
  - [x] 4.3 Connect recent applications data to backend
  - [x] 4.4 Add loading states for dashboard data fetching
  - [x] 4.5 Implement error handling for dashboard API failures

- [x] 5.0 Integrate Profile and Resume Management
  - [x] 5.1 Connect profile page to backend profile API
  - [x] 5.2 Integrate resume CRUD operations with backend
  - [x] 5.3 Connect resume builder to backend resume creation
  - [x] 5.4 Add file upload handling for resume files (mock)
  - [x] 5.5 Implement profile editing with backend persistence

- [ ] 6.0 Connect Notifications and Applications System
  - [x] 6.1 Integrate notification center with backend notifications API
  - [ ] 6.2 Connect job applications to backend applications API
  - [ ] 6.3 Implement vacancy analysis with backend AI endpoint
  - [ ] 6.4 Add real-time notification count updates
  - [ ] 6.5 Connect application status tracking to backend