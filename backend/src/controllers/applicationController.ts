import { Request, Response } from 'express';
import { ApiResponse, Application } from '../types';

export class ApplicationController {
  static async getApplications(req: Request, res: Response<ApiResponse<Application[]>>) {
    try {
      const { status, limit, offset } = req.query;
      
      // Mock application data - expanded with more realistic dates
      const allApplications: Application[] = [
        {
          id: '1',
          userId: '1',
          vacancyId: '1',
          position: "Senior Frontend Developer",
          company: "Яндекс",
          status: 'interview',
          date: "2024-01-15",
          appliedAt: new Date('2024-01-15').toISOString(),
          updatedAt: new Date('2024-01-17').toISOString()
        },
        {
          id: '2',
          userId: '1',
          vacancyId: '2',
          position: "React Developer",
          company: "Avito",
          status: 'response',
          date: "2024-01-14",
          appliedAt: new Date('2024-01-14').toISOString(),
          updatedAt: new Date('2024-01-16').toISOString()
        },
        {
          id: '3',
          userId: '1',
          vacancyId: '3',
          position: "Frontend Team Lead",
          company: "Сбер",
          status: 'pending',
          date: "2024-01-12",
          appliedAt: new Date('2024-01-12').toISOString(),
          updatedAt: new Date('2024-01-12').toISOString()
        },
        {
          id: '4',
          userId: '1',
          vacancyId: '4',
          position: "Full Stack Developer",
          company: "Ozon",
          status: 'rejected',
          date: "2024-01-10",
          appliedAt: new Date('2024-01-10').toISOString(),
          updatedAt: new Date('2024-01-11').toISOString()
        },
        {
          id: '5',
          userId: '1',
          vacancyId: '5',
          position: "Vue.js Developer",
          company: "VK",
          status: 'pending',
          date: "2024-01-18",
          appliedAt: new Date('2024-01-18').toISOString(),
          updatedAt: new Date('2024-01-18').toISOString()
        },
        {
          id: '6',
          userId: '1',
          vacancyId: '6',
          position: "JavaScript Engineer",
          company: "Тинькофф",
          status: 'response',
          date: "2024-01-17",
          appliedAt: new Date('2024-01-17').toISOString(),
          updatedAt: new Date('2024-01-19').toISOString()
        }
      ];

      // Filter by status if provided
      let filteredApplications = allApplications;
      if (status && typeof status === 'string') {
        filteredApplications = allApplications.filter(app => app.status === status);
      }

      // Apply pagination
      const startIndex = offset ? parseInt(offset as string) : 0;
      const endIndex = limit ? startIndex + parseInt(limit as string) : filteredApplications.length;
      const paginatedApplications = filteredApplications.slice(startIndex, endIndex);

      const response: ApiResponse<Application[]> = {
        success: true,
        data: paginatedApplications,
        message: 'Applications retrieved successfully',
        pagination: {
          total: filteredApplications.length,
          offset: startIndex,
          limit: limit ? parseInt(limit as string) : filteredApplications.length,
          hasMore: endIndex < filteredApplications.length
        }
      };

      return res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get applications'
      };
      return res.status(500).json(response);
    }
  }

  static async createApplication(req: Request<{}, ApiResponse<Application>, { vacancyId: string; position?: string; company?: string }>, res: Response<ApiResponse<Application>>) {
    try {
      const { vacancyId, position, company } = req.body;

      if (!vacancyId) {
        const response: ApiResponse = {
          success: false,
          error: 'Vacancy ID is required'
        };
        return res.status(400).json(response);
      }

      // Mock new application with provided or default data
      const newApplication: Application = {
        id: Date.now().toString(),
        userId: '1', // Would come from auth middleware
        vacancyId: vacancyId,
        position: position || "Frontend Developer", 
        company: company || "Mock Company",
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        appliedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const response: ApiResponse<Application> = {
        success: true,
        data: newApplication,
        message: 'Application submitted successfully'
      };

      return res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create application'
      };
      return res.status(400).json(response);
    }
  }

  static async getApplication(req: Request<{ id: string }>, res: Response<ApiResponse<Application>>) {
    try {
      const { id } = req.params;

      // Mock single application with more details
      const mockApplication: Application = {
        id: id,
        userId: '1',
        vacancyId: '1',
        position: "Senior Frontend Developer",
        company: "Яндекс",
        status: 'interview',
        date: "2024-01-15",
        appliedAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date('2024-01-17').toISOString(),
        notes: "Прошел первое собеседование, ожидаю техническое интервью"
      };

      const response: ApiResponse<Application> = {
        success: true,
        data: mockApplication,
        message: 'Application retrieved successfully'
      };

      return res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get application'
      };
      return res.status(404).json(response);
    }
  }

  static async updateApplicationStatus(req: Request<{ id: string }, ApiResponse<Application>, { status: string }>, res: Response<ApiResponse<Application>>) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        const response: ApiResponse = {
          success: false,
          error: 'Status is required'
        };
        return res.status(400).json(response);
      }

      // Mock update
      const updatedApplication: Application = {
        id: id,
        userId: '1',
        vacancyId: '1',
        position: "Senior Frontend Developer",
        company: "Яндекс",
        status: status as any,
        date: "2024-01-15",
        appliedAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date().toISOString()
      };

      const response: ApiResponse<Application> = {
        success: true,
        data: updatedApplication,
        message: 'Application status updated successfully'
      };

      return res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update application status'
      };
      return res.status(400).json(response);
    }
  }

  static async deleteApplication(req: Request<{ id: string }>, res: Response<ApiResponse>) {
    try {
      const { id } = req.params;

      // Mock deletion - just return success
      const response: ApiResponse = {
        success: true,
        message: `Application ${id} deleted successfully`
      };

      return res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete application'
      };
      return res.status(400).json(response);
    }
  }

  static async getApplicationStats(_req: Request, res: Response<ApiResponse<any>>) {
    try {
      const stats = {
        total: 6,
        pending: 2,
        interview: 1,
        response: 2,
        rejected: 1,
        thisWeek: 3,
        thisMonth: 6,
        responseRate: 66.7 // percentage
      };

      const response: ApiResponse<any> = {
        success: true,
        data: stats,
        message: 'Application statistics retrieved successfully'
      };

      return res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get application statistics'
      };
      return res.status(500).json(response);
    }
  }
}