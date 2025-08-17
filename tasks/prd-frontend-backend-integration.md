# Product Requirements Document: Frontend-Backend Integration

## Introduction/Overview

This feature will integrate the existing React frontend with the Node.js/Express backend to replace all hardcoded mock data with API calls. The goal is to create a fully connected full-stack application where all frontend data comes from backend endpoints, ensuring consistent data flow and enabling real application functionality.

## Goals

1. Replace all hardcoded frontend data with API calls to backend endpoints
2. Implement JWT-based authentication flow with token management
3. Add comprehensive error handling with user-friendly notifications
4. Implement loading states for all API operations
5. Create missing backend endpoints for frontend functionality gaps
6. Ensure seamless user experience with proper state management

## User Stories

- As a user, I want my login credentials to be validated by the backend so that my session is secure
- As a user, I want to see loading indicators when data is being fetched so that I know the system is working
- As a user, I want clear error messages when something goes wrong so that I understand what happened
- As a user, I want my profile data to persist on the backend so that it's available across sessions
- As a user, I want my resume data to be saved and retrieved from the backend so that I don't lose my work
- As a user, I want my job applications to be tracked on the backend so that I can see my application history
- As a user, I want vacancy search results to come from the backend so that I get up-to-date job listings

## Functional Requirements

1. **Authentication Integration**
   - Replace frontend authentication state with JWT token-based system
   - Store JWT tokens securely in localStorage
   - Implement automatic token refresh mechanism
   - Add protected route middleware that validates tokens

2. **API Service Layer**
   - Create centralized API service module for all backend communications
   - Implement axios interceptors for request/response handling
   - Add automatic token attachment to requests
   - Handle token expiration and redirect to login

3. **Error Handling System**
   - Implement global error handling for API failures
   - Show toast notifications for API errors using Sonner
   - Handle network errors, 404s, and 500s gracefully
   - Provide user-friendly error messages in Russian

4. **Loading States**
   - Add loading spinners for all API operations
   - Implement skeleton loading for data-heavy components
   - Show loading states for form submissions
   - Disable user interactions during loading

5. **Data Integration Points**
   - **Dashboard**: Connect vacancy search, filters, and user stats to backend
   - **Profile Page**: Integrate user profile CRUD operations
   - **Resume Management**: Connect resume creation, editing, and deletion
   - **Applications**: Integrate job application tracking
   - **Notifications**: Connect notification center to backend
   - **Vacancy Analysis**: Connect AI analysis features

6. **Missing Backend Endpoints**
   - Vacancy search with filters endpoint enhancement
   - Resume file upload handling (mock response)
   - AI vacancy analysis endpoint (mock response)
   - User settings management endpoint
   - Bulk operations for notifications

## Non-Goals (Out of Scope)

- Real file upload functionality (using mocks for now)
- WebSocket real-time notifications
- Server-side caching implementation
- Database optimization
- Advanced search functionality beyond basic filters
- Email notifications
- Third-party integrations

## Design Considerations

- Maintain existing UI/UX design
- Use existing toast system (Sonner) for notifications
- Keep loading spinners consistent with current design
- Preserve Russian localization throughout
- Maintain responsive design during loading states

## Technical Considerations

- Use Axios for HTTP client with interceptors
- Implement centralized API configuration
- Create custom React hooks for API operations
- Use React Context for global state management
- Maintain TypeScript types consistency between frontend and backend
- Handle CORS properly in development and production
- Follow existing error handling patterns in backend

## Success Metrics

- All frontend pages load data from backend APIs (100% integration)
- Zero hardcoded data remaining in frontend components
- Successful authentication flow with token persistence
- Error handling covers all API failure scenarios
- Loading states provide clear feedback for all operations
- User experience remains smooth during API operations

## Open Questions

- Should we implement optimistic updates for better UX?
- Do we need to handle offline scenarios?
- Should API responses be cached in frontend state?
- What should be the token expiration time?