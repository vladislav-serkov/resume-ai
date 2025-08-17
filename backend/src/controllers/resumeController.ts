import { Request, Response } from 'express';
import { ApiResponse, Resume } from '../types';

export class ResumeController {
  static async getResumes(_req: Request, res: Response<ApiResponse<Resume[]>>) {
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

  static async uploadResume(_req: Request, res: Response<ApiResponse<any>>) {
    try {
      // Mock file upload processing
      const mockFileData = {
        originalName: 'resume.pdf',
        mimeType: 'application/pdf',
        size: 1024576, // 1MB
        uploadDate: new Date().toISOString()
      };

      // Simulate file processing and text extraction
      const mockExtractedData = {
        personalInfo: {
          name: 'Иван Петров',
          email: 'ivan.petrov@email.com',
          phone: '+7 (999) 123-45-67',
          location: 'Москва'
        },
        experience: [
          {
            title: 'Frontend Developer',
            company: 'ООО "ТехКомпания"',
            period: '2021 - настоящее время',
            description: 'Разработка веб-приложений на React, интеграция с API, участие в код-ревью'
          },
          {
            title: 'Junior Frontend Developer',
            company: 'ИП Сидоров',
            period: '2020 - 2021',
            description: 'Верстка лендингов, изучение React, работа с дизайн-макетами'
          }
        ],
        education: [
          {
            institution: 'МГУ им. М.В. Ломоносова',
            degree: 'Бакалавр прикладной математики',
            period: '2016 - 2020'
          }
        ],
        skills: ['JavaScript', 'React', 'HTML/CSS', 'Git', 'TypeScript', 'Node.js'],
        languages: [
          { name: 'Русский', level: 'Родной' },
          { name: 'Английский', level: 'Intermediate' }
        ]
      };

      // Create new resume record
      const newResume: Resume = {
        id: Date.now().toString(),
        userId: '1',
        name: `Резюме из файла - ${mockFileData.originalName}`,
        isOriginal: true,
        uploadDate: new Date().toISOString().split('T')[0],
        adaptations: 0
      };

      const response = {
        success: true,
        data: {
          resume: newResume,
          fileInfo: mockFileData,
          extractedData: mockExtractedData,
          processingStats: {
            pagesProcessed: 2,
            sectionsFound: ['personal_info', 'experience', 'education', 'skills'],
            confidence: 0.95
          }
        },
        message: 'Файл резюме успешно загружен и обработан'
      };

      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Ошибка при загрузке файла резюме'
      });
    }
  }

  static async downloadResume(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      // Mock file download - in real implementation would stream actual file
      const mockPdfContent = 'Mock PDF content for resume ' + id;
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="resume_${id}.pdf"`);
      res.setHeader('Content-Length', Buffer.byteLength(mockPdfContent));
      
      res.end(mockPdfContent);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Ошибка при скачивании резюме'
      });
    }
  }

  static async previewResume(req: Request<{ id: string }>, res: Response<ApiResponse<any>>) {
    try {
      const { id } = req.params;

      // Mock resume preview data
      const mockPreview = {
        id: id,
        name: 'Основное резюме',
        sections: {
          personalInfo: {
            name: 'Иван Петров',
            email: 'ivan.petrov@email.com',
            phone: '+7 (999) 123-45-67',
            location: 'Москва',
            summary: 'Frontend разработчик с опытом работы более 3 лет'
          },
          experience: [
            {
              title: 'Senior Frontend Developer',
              company: 'ООО "ТехКомпания"',
              period: '2022 - настоящее время',
              achievements: [
                'Разработал 5 крупных веб-приложений на React',
                'Увеличил производительность приложений на 40%',
                'Менторил 3 junior разработчиков'
              ]
            }
          ],
          skills: {
            technical: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
            soft: ['Командная работа', 'Лидерство', 'Аналитическое мышление']
          },
          education: [
            {
              institution: 'МГУ им. М.В. Ломоносова',
              degree: 'Бакалавр прикладной математики',
              year: '2020'
            }
          ]
        },
        metadata: {
          lastModified: new Date().toISOString(),
          version: '1.2',
          format: 'pdf'
        }
      };

      res.json({
        success: true,
        data: mockPreview,
        message: 'Предварительный просмотр резюме получен успешно'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Ошибка при получении предварительного просмотра резюме'
      });
    }
  }
}