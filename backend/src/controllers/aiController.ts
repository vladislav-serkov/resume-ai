import { Request, Response } from 'express';
import { ApiResponse } from '../types';

interface VacancyAnalysisRequest {
  text: string;
  resumeId?: string;
}

interface VacancyAnalysisResult {
  id: string;
  vacancyText: string;
  analysis: {
    requiredSkills: string[];
    optionalSkills: string[];
    experienceLevel: string;
    keyRequirements: string[];
    salaryRange: string;
    location: string;
    companyType: string;
    workFormat: string;
  };
  matching: {
    matchScore: number;
    recommendations: string[];
    missingSkills: string[];
    strongPoints: string[];
  };
  resumeOptimization: {
    suggestedChanges: string[];
    keywordsToAdd: string[];
    sectionsToImprove: string[];
  } | undefined;
  createdAt: string;
}

export class AIController {
  static async analyzeVacancy(req: Request<{}, ApiResponse<VacancyAnalysisResult>, VacancyAnalysisRequest>, res: Response<ApiResponse<VacancyAnalysisResult>>) {
    try {
      const { text, resumeId } = req.body;

      if (!text || text.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Текст вакансии не может быть пустым'
        });
      }

      // Mock AI analysis result
      const mockAnalysis: VacancyAnalysisResult = {
        id: `analysis_${Date.now()}`,
        vacancyText: text,
        analysis: {
          requiredSkills: ['React', 'TypeScript', 'Node.js', 'Git', 'REST API'],
          optionalSkills: ['Docker', 'AWS', 'GraphQL', 'Redux', 'Jest'],
          experienceLevel: 'Middle (3-5 лет)',
          keyRequirements: [
            'Опыт разработки на React от 3 лет',
            'Знание TypeScript обязательно',
            'Опыт работы с Node.js и REST API',
            'Знание системы контроля версий Git',
            'Опыт командной разработки'
          ],
          salaryRange: '150,000 - 250,000 ₽',
          location: 'Москва (гибридный формат)',
          companyType: 'IT-продуктовая компания',
          workFormat: 'Гибридный (офис + удаленка)'
        },
        matching: {
          matchScore: Math.floor(Math.random() * 30) + 70, // 70-100%
          recommendations: [
            'Подчеркните опыт работы с TypeScript в резюме',
            'Добавьте примеры проектов на React',
            'Упомяните опыт работы с REST API',
            'Выделите навыки командной работы',
            'Добавьте ссылки на GitHub проекты'
          ],
          missingSkills: ['Docker', 'Unit Testing'],
          strongPoints: ['React', 'JavaScript', 'Frontend Development']
        },
        resumeOptimization: resumeId ? {
          suggestedChanges: [
            'Добавить раздел с ключевыми технологиями в начало резюме',
            'Описать конкретные достижения в проектах с React',
            'Указать размер команды и роль в проектах',
            'Добавить информацию о используемых инструментах разработки'
          ],
          keywordsToAdd: ['TypeScript', 'REST API', 'Agile', 'Scrum'],
          sectionsToImprove: ['Технические навыки', 'Опыт работы', 'Проекты']
        } as {
          suggestedChanges: string[];
          keywordsToAdd: string[];
          sectionsToImprove: string[];
        } : undefined,
        createdAt: new Date().toISOString()
      };

      return res.json({
        success: true,
        data: mockAnalysis,
        message: 'Анализ вакансии выполнен успешно'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Ошибка при анализе вакансии'
      });
    }
  }

  static async getAnalysisHistory(_req: Request, res: Response<ApiResponse<VacancyAnalysisResult[]>>) {
    try {
      // Mock analysis history
      const mockHistory: VacancyAnalysisResult[] = [
        {
          id: 'analysis_1',
          vacancyText: 'Frontend Developer позиция в крупной IT компании...',
          analysis: {
            requiredSkills: ['React', 'TypeScript', 'CSS'],
            optionalSkills: ['Redux', 'Webpack'],
            experienceLevel: 'Senior (5+ лет)',
            keyRequirements: ['Опыт с React от 5 лет'],
            salaryRange: '200,000 - 300,000 ₽',
            location: 'Санкт-Петербург',
            companyType: 'Финтех',
            workFormat: 'Удаленно'
          },
          matching: {
            matchScore: 85,
            recommendations: ['Добавить опыт с Redux'],
            missingSkills: ['Redux'],
            strongPoints: ['React', 'TypeScript']
          },
          resumeOptimization: undefined,
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          id: 'analysis_2',
          vacancyText: 'Full Stack Developer в стартапе...',
          analysis: {
            requiredSkills: ['React', 'Node.js', 'MongoDB'],
            optionalSkills: ['GraphQL', 'Docker'],
            experienceLevel: 'Middle (3-5 лет)',
            keyRequirements: ['Full Stack опыт'],
            salaryRange: '180,000 - 220,000 ₽',
            location: 'Москва',
            companyType: 'Стартап',
            workFormat: 'Офис'
          },
          matching: {
            matchScore: 78,
            recommendations: ['Изучить MongoDB'],
            missingSkills: ['MongoDB'],
            strongPoints: ['React', 'Node.js']
          },
          resumeOptimization: undefined,
          createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
        }
      ];

      return res.json({
        success: true,
        data: mockHistory,
        message: 'История анализов получена успешно'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Ошибка при получении истории анализов'
      });
    }
  }

  static async deleteAnalysis(req: Request, res: Response<ApiResponse<null>>) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID анализа не указан'
        });
      }

      // Mock deletion
      return res.json({
        success: true,
        data: null,
        message: 'Анализ удален успешно'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Ошибка при удалении анализа'
      });
    }
  }

  static async generateResumeAdaptation(req: Request, res: Response<ApiResponse<any>>) {
    try {
      const { analysisId, resumeId } = req.body;

      if (!analysisId || !resumeId) {
        return res.status(400).json({
          success: false,
          error: 'ID анализа и резюме обязательны'
        });
      }

      // Mock adapted resume suggestions
      const mockAdaptation = {
        id: `adaptation_${Date.now()}`,
        originalResumeId: resumeId,
        analysisId: analysisId,
        adaptedSections: {
          summary: 'Frontend Developer с опытом разработки на React и TypeScript более 3 лет. Специализируюсь на создании современных веб-приложений с использованием актуальных технологий и best practices.',
          skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'REST API', 'Git', 'HTML/CSS', 'Responsive Design'],
          experience: [
            {
              title: 'Frontend Developer',
              company: 'ООО "ТехКомпания"',
              period: '2021 - настоящее время',
              description: 'Разработка SPA приложений на React с TypeScript. Интеграция с REST API. Участие в код-ревью и менторинг junior разработчиков.'
            }
          ]
        },
        improvements: [
          'Добавлены ключевые слова из вакансии',
          'Усилен акцент на опыте с TypeScript',
          'Выделены навыки работы в команде',
          'Добавлены конкретные технологии из требований'
        ],
        matchScoreImprovement: 15, // +15% to match score
        createdAt: new Date().toISOString()
      };

      return res.json({
        success: true,
        data: mockAdaptation,
        message: 'Адаптация резюме создана успешно'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Ошибка при создании адаптации резюме'
      });
    }
  }
}