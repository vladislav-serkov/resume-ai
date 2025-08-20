import { Request, Response } from 'express';
import { ApiResponse, Vacancy, VacancyFilters } from '../types';

export class VacancyController {
  static async getVacancies(req: Request<{}, ApiResponse<Vacancy[]>, {}, VacancyFilters>, res: Response<ApiResponse<Vacancy[]>>) {
    try {
      // Mock vacancy data
      const mockVacancies: Vacancy[] = [
        {
          id: '1',
          title: "Senior Frontend Developer",
          company: "Яндекс",
          location: "Москва",
          salary: "200 000 - 350 000 ₽",
          type: "Полная занятость",
          tags: ["React", "TypeScript", "Redux"],
          posted: "2 часа назад",
          aiMatch: 92,
          logo: "https://via.placeholder.com/48/FF0000/FFFFFF?text=Я",
          description: "Ищем опытного Frontend разработчика для работы над ключевыми продуктами компании...",
          requirements: ["React от 3 лет", "TypeScript", "Опыт с Redux", "Знание Jest"],
          isNew: true,
          remote: false
        },
        {
          id: '2',
          title: "React Developer",
          company: "Avito",
          location: "Санкт-Петербург",
          salary: "150 000 - 250 000 ₽",
          type: "Полная занятость",
          tags: ["React", "JavaScript", "Node.js"],
          posted: "5 часов назад",
          aiMatch: 87,
          logo: "https://via.placeholder.com/48/00AA44/FFFFFF?text=A",
          description: "Присоединяйтесь к команде разработки одного из крупнейших маркетплейсов...",
          requirements: ["React от 2 лет", "JavaScript ES6+", "Опыт с API", "Git"],
          isNew: true,
          remote: true
        },
        {
          id: '3',
          title: "Frontend Team Lead",
          company: "Сбер",
          location: "Москва",
          salary: "300 000 - 450 000 ₽",
          type: "Полная занятость",
          tags: ["React", "Leadership", "Architecture"],
          posted: "1 день назад",
          aiMatch: 78,
          logo: "https://via.placeholder.com/48/00A650/FFFFFF?text=С",
          description: "Ведущий разработчик для управления командой frontend разработки...",
          requirements: ["React от 5 лет", "Опыт руководства", "Архитектура", "Менторство"],
          isNew: false,
          remote: false
        },
        {
          id: '4',
          title: "Full Stack Developer",
          company: "Ozon",
          location: "Москва",
          salary: "180 000 - 280 000 ₽",
          type: "Полная занятость",
          tags: ["React", "Node.js", "MongoDB"],
          posted: "3 дня назад",
          aiMatch: 95,
          logo: "https://via.placeholder.com/48/005AFF/FFFFFF?text=O",
          description: "Разработчик полного стека для ecommerce платформы...",
          requirements: ["React", "Node.js", "MongoDB", "REST API"],
          isNew: false,
          remote: true
        }
      ];

      // Apply filters
      let filteredVacancies = [...mockVacancies];
      
      const { query, location, salary, remote } = req.query;
      
      if (query) {
        filteredVacancies = filteredVacancies.filter(v => 
          v.title.toLowerCase().includes(query.toLowerCase()) ||
          v.company.toLowerCase().includes(query.toLowerCase()) ||
          v.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      if (location) {
        filteredVacancies = filteredVacancies.filter(v => 
          v.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      if (remote === 'true') {
        filteredVacancies = filteredVacancies.filter(v => v.remote);
      }

      const response: ApiResponse<Vacancy[]> = {
        success: true,
        data: filteredVacancies,
        message: 'Vacancies retrieved successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get vacancies'
      };
      res.status(500).json(response);
    }
  }

  static async getVacancy(req: Request<{ id: string }>, res: Response<ApiResponse<Vacancy>>) {
    try {
      const { id } = req.params;

      // Mock single vacancy data
      const mockVacancy: Vacancy = {
        id: id,
        title: "Senior Frontend Developer",
        company: "Яндекс",
        location: "Москва",
        salary: "200 000 - 350 000 ₽",
        type: "Полная занятость",
        tags: ["React", "TypeScript", "Redux"],
        posted: "2 часа назад",
        aiMatch: 92,
        logo: "https://via.placeholder.com/48/FF0000/FFFFFF?text=Я",
        description: "Ищем опытного Frontend разработчика для работы над ключевыми продуктами компании. В команде вы будете работать с современными технологиями и решать интересные задачи.",
        requirements: [
          "React от 3 лет",
          "TypeScript",
          "Опыт с Redux",
          "Знание Jest",
          "Опыт работы с REST API",
          "Понимание принципов responsive design"
        ],
        isNew: true,
        remote: false
      };

      const response: ApiResponse<Vacancy> = {
        success: true,
        data: mockVacancy,
        message: 'Vacancy retrieved successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get vacancy'
      };
      res.status(404).json(response);
    }
  }
}