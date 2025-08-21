// Toast configuration constants
export const TOAST_LIMIT = 1;
export const TOAST_REMOVE_DELAY = 1000000;

// Application status labels
export const APPLICATION_STATUS_LABELS = {
  interview: 'Собеседование',
  response: 'Ответ получен',
  pending: 'Ожидание',
  rejected: 'Отказ'
} as const;

// Application status styles
export const APPLICATION_STATUS_STYLES = {
  interview: 'bg-blue-100 text-blue-800',
  response: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800'
} as const;

// Match score color classes
export const MATCH_SCORE_COLORS = {
  EXCELLENT: 'text-green-600 bg-green-100',  // 90+
  GOOD: 'text-blue-600 bg-blue-100',         // 70-89
  FAIR: 'text-orange-600 bg-orange-100',     // 50-69
  POOR: 'text-red-600 bg-red-100'            // <50
} as const;

// Spinner size configurations
export const SPINNER_SIZE_CLASSES = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
} as const;

export const SPINNER_TEXT_SIZE_CLASSES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
} as const;

// Navigation tabs
export const DASHBOARD_TABS = {
  APPLICATIONS: 'applications'
} as const;

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Это поле обязательно для заполнения',
  INVALID_EMAIL: 'Введите корректный email адрес',
  PASSWORD_MIN_LENGTH: 'Пароль должен содержать минимум 8 символов',
  PASSWORD_MISMATCH: 'Пароли не совпадают'
} as const;

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  VACANCIES: '/api/vacancies',
  APPLICATIONS: '/api/applications',
  PROFILE: '/api/profile'
} as const;