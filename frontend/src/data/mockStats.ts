import { DashboardStats, Application, ApplicationStatus } from '../types';

export const mockDashboardStats: DashboardStats = {
  totalApplications: 24,
  responses: 8,
  interviews: 3,
  offers: 1,
  aiAdaptations: 45,
  autoResponses: 12
};

export const mockApplications: Application[] = [
  { 
    id: 1, 
    position: "Senior Frontend Developer", 
    company: "Яндекс", 
    status: ApplicationStatus.INTERVIEW, 
    date: "2024-01-15" 
  },
  { 
    id: 2, 
    position: "React Developer", 
    company: "Avito", 
    status: ApplicationStatus.RESPONSE, 
    date: "2024-01-14" 
  },
  { 
    id: 3, 
    position: "Frontend Team Lead", 
    company: "Сбер", 
    status: ApplicationStatus.PENDING, 
    date: "2024-01-12" 
  },
  { 
    id: 4, 
    position: "Full Stack Developer", 
    company: "Ozon", 
    status: ApplicationStatus.REJECTED, 
    date: "2024-01-10" 
  }
];