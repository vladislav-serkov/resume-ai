// Core user types
export interface User {
  name: string;
  position: string;
  avatar: string;
  email: string;
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

export interface AIStatus {
  id: string;
  is_active: boolean;
  last_updated: string;
}

// Event handler types
export type VoidFunction = () => void;