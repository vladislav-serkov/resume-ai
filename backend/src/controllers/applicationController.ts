import { Request, Response } from 'express';
import { ApiResponse, Application } from '../types';

export class ApplicationController {
  static async getApplications(req: Request, res: Response<ApiResponse<Application[]>>) {
    try {
      // Mock application data
      const mockApplications: Application[] = [
        {
          id: '1',
          userId: '1',
          vacancyId: '1',
          position: "Senior Frontend Developer",
          company: "Яндекс",
          status: 'interview',
          date: "2024-01-15"
        },
        {
          id: '2',
          userId: '1',
          vacancyId: '2',
          position: "React Developer",
          company: "Avito",
          status: 'response',
          date: "2024-01-14"
        },
        {
          id: '3',
          userId: '1',
          vacancyId: '3',
          position: "Frontend Team Lead",
          company: "Сбер",
          status: 'pending',
          date: "2024-01-12"
        },
        {
          id: '4',
          userId: '1',
          vacancyId: '4',
          position: "Full Stack Developer",
          company: "Ozon",
          status: 'rejected',
          date: "2024-01-10"
        }
      ];

      const response: ApiResponse<Application[]> = {
        success: true,
        data: mockApplications,
        message: 'Applications retrieved successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get applications'
      };
      res.status(500).json(response);
    }
  }

  static async createApplication(req: Request<{}, ApiResponse<Application>, { vacancyId: string }>, res: Response<ApiResponse<Application>>) {
    try {
      const { vacancyId } = req.body;

      // Mock new application
      const newApplication: Application = {
        id: Date.now().toString(),
        userId: '1',
        vacancyId: vacancyId,
        position: "Frontend Developer", // This would be fetched from vacancy
        company: "Mock Company",
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
      };

      const response: ApiResponse<Application> = {
        success: true,
        data: newApplication,
        message: 'Application submitted successfully'
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create application'
      };
      res.status(400).json(response);
    }
  }

  static async getApplication(req: Request<{ id: string }>, res: Response<ApiResponse<Application>>) {
    try {
      const { id } = req.params;

      // Mock single application
      const mockApplication: Application = {
        id: id,
        userId: '1',
        vacancyId: '1',
        position: "Senior Frontend Developer",
        company: "Яндекс",
        status: 'interview',
        date: "2024-01-15"
      };

      const response: ApiResponse<Application> = {
        success: true,
        data: mockApplication,
        message: 'Application retrieved successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get application'
      };
      res.status(404).json(response);
    }
  }
}