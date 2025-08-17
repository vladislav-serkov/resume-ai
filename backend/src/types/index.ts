// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  position: string;
  phone?: string;
  location?: string;
  experience?: string;
  about?: string;
  skills?: string[];
  salary?: string;
  employment?: string;
  remote?: boolean;
  resumeUploaded?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  position: string;
  experience: string;
  agreeToTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

// Resume Types
export interface Resume {
  id: string;
  userId: string;
  name: string;
  isOriginal: boolean;
  uploadDate?: string;
  adaptations?: number;
  lastUsed?: string;
  baseVacancy?: string;
  adaptationDate?: string;
  matchScore?: number;
}

// Vacancy Types
export interface Vacancy {
  id: string;
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

export interface VacancyFilters {
  query?: string;
  location?: string;
  salary?: string;
  experience?: string;
  remote?: string;
}

// Application Types
export interface Application {
  id: string;
  userId: string;
  vacancyId: string;
  position: string;
  company: string;
  status: 'pending' | 'interview' | 'response' | 'rejected';
  date: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'job_match' | 'application_sent' | 'response_received' | 'interview_reminder' | 'stats_update' | 'profile_incomplete';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  action?: string;
  priority?: 'high' | 'medium' | 'low';
}

// Stats Types
export interface UserStats {
  totalApplications: number;
  responses: number;
  interviews: number;
  offers: number;
  aiAdaptations: number;
  autoResponses: number;
  successRate: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}