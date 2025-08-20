// Core user and authentication types
export interface User {
  name: string;
  position: string;
  avatar: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Vacancy and job related types
export interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tags: string[];
  posted: string;
  aiMatch: number;
  logo: string;
  description: string;
  requirements: string[];
  isNew: boolean;
  remote: boolean;
}

export interface VacancyAnalysis {
  requiredSkills: string[];
  optionalSkills: string[];
  experienceLevel: string;
  keyRequirements: string[];
  matchScore: number;
  recommendations: string[];
  salaryRange: string;
  location: string;
  companyType: string;
}

// Application and status types
export interface Application {
  id: number;
  position: string;
  company: string;
  status: ApplicationStatus;
  date: string;
}

export enum ApplicationStatus {
  INTERVIEW = 'interview',
  RESPONSE = 'response',
  PENDING = 'pending',
  REJECTED = 'rejected'
}

// Statistics and dashboard types
export interface DashboardStats {
  totalApplications: number;
  responses: number;
  interviews: number;
  offers: number;
  aiAdaptations: number;
  autoResponses: number;
}

// Filter and search types
export interface SearchFilters {
  location: string;
  salary: string;
  experience: string;
  remote: boolean;
}

// Component props types
export interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export interface VacancyAnalyzerProps {
  vacancyText?: string;
  onAnalysisComplete?: (analysis: VacancyAnalysis) => void;
}

export interface LoadingSpinnerProps {
  text?: string;
  size?: SpinnerSize;
}

export enum SpinnerSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg'
}

// Toast and notification types
export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export enum ToastVariant {
  DEFAULT = 'default',
  DESTRUCTIVE = 'destructive',
  SUCCESS = 'success',
  WARNING = 'warning'
}

export interface ToastState {
  toasts: Toast[];
}

export interface ToastAction {
  type: ToastActionType;
  toast?: Toast;
  toastId?: string;
}

export enum ToastActionType {
  ADD_TOAST = 'ADD_TOAST',
  UPDATE_TOAST = 'UPDATE_TOAST',
  DISMISS_TOAST = 'DISMISS_TOAST',
  REMOVE_TOAST = 'REMOVE_TOAST'
}

// Form and validation types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Event handler types
export type VoidFunction = () => void;
export type LoginHandler = (userData: User) => void;
export type LogoutHandler = VoidFunction;