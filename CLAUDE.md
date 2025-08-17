# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack resume AI agent application with a React frontend and FastAPI backend. The application helps users analyze job vacancies and optimize their resumes for better job matching.

## Development Commands

### Frontend (React + TailwindCSS)
The main frontend application is located in the `frontend/` directory and uses Create React App with CRACO for configuration.

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
yarn install

# Start development server (localhost:3000)
yarn start

# Build for production
yarn build

# Run tests
yarn test
```

### Backend (FastAPI + Python)
The backend API is located in the `backend/` directory.

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start development server
uvicorn server:app --reload

# Run tests
pytest

# Code formatting and linting
black .
isort .
flake8 .
mypy .
```

## Architecture

### Frontend Structure
- **React 19** with React Router for SPA navigation
- **TailwindCSS** with shadcn/ui components for styling
- **CRACO** for webpack customization and path aliasing (`@/` maps to `src/`)
- **Radix UI** components for accessible UI primitives
- **Lucide React** for icons

Key directories:
- `src/pages/` - Main application pages (Dashboard, Landing, Login, etc.)
- `src/components/` - Reusable React components including AI analysis tools
- `src/components/ui/` - shadcn/ui component library
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions

### Backend Structure
- **FastAPI** with async/await support
- **MongoDB** with Motor (async driver) for data persistence
- **Pydantic** models for data validation
- API routes are prefixed with `/api`

### Authentication
The frontend uses a simple state-based authentication system with protected routes. The backend appears to be set up for JWT authentication with proper user management.

### Key Features
- **Vacancy Analysis**: AI-powered job description analysis to match resumes
- **Resume Optimization**: Recommendations for improving resume-job fit
- **User Dashboard**: Central hub for managing applications and analysis history
- **Profile Management**: User account and resume management

## Configuration Notes

### Hot Reload Control
The CRACO config supports disabling hot reload via `DISABLE_HOT_RELOAD=true` environment variable for performance optimization.

### Path Aliases
- `@/` is aliased to `src/` directory for cleaner imports
- Use `@/components/ui/button` instead of `../../../components/ui/button`

### Database
- MongoDB connection configured via environment variables (`MONGO_URL`, `DB_NAME`)
- Uses Motor for async database operations

## Dependencies

### Frontend Key Dependencies
- React Router DOM for navigation
- Axios for HTTP requests
- React Hook Form with Zod validation
- Date-fns for date manipulation
- Sonner for toast notifications

### Backend Key Dependencies
- FastAPI with Uvicorn server
- Motor (async MongoDB driver)
- JWT libraries for authentication
- Boto3 for AWS integration
- Pandas/NumPy for data processing

## Development Notes

When working with this codebase:
- Frontend development should be done in the `frontend/` directory
- Use yarn as the package manager for the frontend
- Backend uses pip/requirements.txt for dependency management
- The application expects a MongoDB instance for data persistence
- Environment variables are loaded from `.env` files in respective directories