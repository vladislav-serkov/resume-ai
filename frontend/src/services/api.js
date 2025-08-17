import axios from 'axios';
import { toast } from 'sonner';

// API Base URL configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8001/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token but don't redirect automatically
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          toast.error('Ошибка авторизации');
          break;
        case 404:
          toast.error('Запрашиваемый ресурс не найден');
          break;
        case 500:
          toast.error('Ошибка сервера. Попробуйте позже');
          break;
        default:
          toast.error(data?.message || 'Произошла ошибка');
      }
    } else if (error.request) {
      // Network error
      toast.error('Ошибка сети. Проверьте подключение к интернету');
    } else {
      // Something else happened
      toast.error('Произошла неожиданная ошибка');
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Generic HTTP methods
  get: (url, config = {}) => api.get(url, config),
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
  
  // Authentication
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
  },
  
  // Profile management
  profile: {
    get: () => api.get('/profile'),
    update: (data) => api.put('/profile', data),
  },
  
  // Resume management
  resumes: {
    getAll: () => api.get('/resumes'),
    getById: (id) => api.get(`/resumes/${id}`),
    create: (data) => api.post('/resumes', data),
    update: (id, data) => api.put(`/resumes/${id}`, data),
    delete: (id) => api.delete(`/resumes/${id}`),
    upload: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return api.post('/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  },
  
  // Vacancy management
  vacancies: {
    search: (filters = {}) => {
      const params = new URLSearchParams(filters).toString();
      return api.get(`/vacancies${params ? `?${params}` : ''}`);
    },
    getById: (id) => api.get(`/vacancies/${id}`),
  },
  
  // Applications
  applications: {
    getAll: (params = {}) => api.get('/applications', { params }),
    getById: (id) => api.get(`/applications/${id}`),
    create: (data) => api.post('/applications', data),
    updateStatus: (id, status) => api.put(`/applications/${id}/status`, { status }),
    delete: (id) => api.delete(`/applications/${id}`),
    getStats: () => api.get('/applications/stats'),
  },
  
  // Notifications
  notifications: {
    getAll: () => api.get('/notifications'),
    getUnreadCount: () => api.get('/notifications/unread-count'),
    markAsRead: (id) => api.put(`/notifications/${id}/read`),
    markAllAsRead: () => api.put('/notifications/read-all'),
    delete: (id) => api.delete(`/notifications/${id}`),
  },
  
  // Statistics
  stats: {
    get: () => api.get('/stats'),
  },
  
  // AI Analysis
  ai: {
    analyzeVacancy: (vacancyText, resumeId = null) => api.post('/ai/analyze-vacancy', { text: vacancyText, resumeId }),
    getAnalysisHistory: () => api.get('/ai/analysis-history'),
    deleteAnalysis: (id) => api.delete(`/ai/analysis/${id}`),
    generateResumeAdaptation: (analysisId, resumeId) => api.post('/ai/adapt-resume', { analysisId, resumeId }),
  },
  
  // Settings
  settings: {
    get: () => api.get('/settings'),
    update: (data) => api.put('/settings', data),
  },
};

export default api;