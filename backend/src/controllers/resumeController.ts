import { Request, Response } from 'express';
import { ApiResponse, Resume } from '../types';

export class ResumeController {
  static async getResumes(req: Request, res: Response<ApiResponse<Resume[]>>) {
    try {
      // Mock resume data
      const mockResumes: Resume[] = [
        {
          id: '1',
          userId: '1',
          name: 'Основное резюме',
          isOriginal: true,
          uploadDate: '2024-01-10',
          adaptations: 15,
          lastUsed: '2024-01-15'
        },
        {
          id: '2',
          userId: '1',
          name: 'Адаптированное для Яндекс',
          isOriginal: false,
          baseVacancy: 'Senior Frontend Developer - Яндекс',
          adaptationDate: '2024-01-15',
          matchScore: 92
        },
        {
          id: '3',
          userId: '1',
          name: 'Адаптированное для Avito',
          isOriginal: false,
          baseVacancy: 'React Developer - Avito',
          adaptationDate: '2024-01-14',
          matchScore: 87
        }
      ];

      const response: ApiResponse<Resume[]> = {
        success: true,
        data: mockResumes,
        message: 'Resumes retrieved successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get resumes'
      };
      res.status(500).json(response);
    }
  }

  static async createResume(req: Request<{}, ApiResponse<Resume>, Partial<Resume>>, res: Response<ApiResponse<Resume>>) {
    try {
      const resumeData = req.body;

      // Mock created resume
      const newResume: Resume = {
        id: Date.now().toString(),
        userId: '1',
        name: resumeData.name || 'Новое резюме',
        isOriginal: resumeData.isOriginal || true,
        uploadDate: new Date().toISOString().split('T')[0],
        adaptations: 0
      };

      const response: ApiResponse<Resume> = {
        success: true,
        data: newResume,
        message: 'Resume created successfully'
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create resume'
      };
      res.status(400).json(response);
    }
  }

  static async updateResume(req: Request<{ id: string }, ApiResponse<Resume>, Partial<Resume>>, res: Response<ApiResponse<Resume>>) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Mock updated resume
      const updatedResume: Resume = {
        id: id,
        userId: '1',
        name: updateData.name || 'Обновленное резюме',
        isOriginal: updateData.isOriginal || true,
        uploadDate: '2024-01-10',
        adaptations: 15
      };

      const response: ApiResponse<Resume> = {
        success: true,
        data: updatedResume,
        message: 'Resume updated successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update resume'
      };
      res.status(400).json(response);
    }
  }

  static async deleteResume(req: Request<{ id: string }>, res: Response<ApiResponse>) {
    try {
      const { id } = req.params;

      const response: ApiResponse = {
        success: true,
        message: `Resume ${id} deleted successfully`
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete resume'
      };
      res.status(400).json(response);
    }
  }
}