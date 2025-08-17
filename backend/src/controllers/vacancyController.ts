import { Request, Response } from 'express';
import { ApiResponse, Vacancy, VacancyFilters } from '../types';

export class VacancyController {
  static async getVacancies(req: Request<{}, ApiResponse<Vacancy[]>, {}, VacancyFilters>, res: Response<ApiResponse<Vacancy[]>>) {
    try {
      const filters = req.query;
      
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

      // Add more mock vacancies for better filtering demonstration
      const extendedMockVacancies: Vacancy[] = [
        ...mockVacancies,
        {
          id: '5',
          title: "Backend Developer",
          company: "Wildberries",
          location: "Удаленно",
          salary: "120 000 - 200 000 ₽",
          type: "Полная занятость",
          tags: ["Node.js", "PostgreSQL", "Docker"],
          posted: "1 час назад",
          aiMatch: 65,
          logo: "https://via.placeholder.com/48/8B00FF/FFFFFF?text=W",
          description: "Backend разработчик для высоконагруженной системы...",
          requirements: ["Node.js от 2 лет", "PostgreSQL", "Docker"],
          isNew: true,
          remote: true
        },
        {
          id: '6',
          title: "Junior Frontend Developer",
          company: "Mail.ru",
          location: "Санкт-Петербург",
          salary: "80 000 - 120 000 ₽",
          type: "Полная занятость",
          tags: ["JavaScript", "HTML", "CSS"],
          posted: "2 дня назад",
          aiMatch: 45,
          logo: "https://via.placeholder.com/48/FF6600/FFFFFF?text=M",
          description: "Начинающий frontend разработчик в команду...",
          requirements: ["JavaScript", "HTML/CSS", "Git"],
          isNew: false,
          remote: false
        }
      ];

      // Apply advanced filters
      let filteredVacancies = [...extendedMockVacancies];
      
      const { 
        query, 
        location, 
        remote, 
        salary_min, 
        salary_max, 
        experience, 
        company, 
        tags, 
        sort_by, 
        order,
        limit,
        offset 
      } = filters;
      
      // Text search filter
      if (query) {
        const searchTerm = query.toLowerCase();
        filteredVacancies = filteredVacancies.filter(v => 
          v.title.toLowerCase().includes(searchTerm) ||
          v.company.toLowerCase().includes(searchTerm) ||
          v.description.toLowerCase().includes(searchTerm) ||
          v.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      // Location filter
      if (location && location !== 'all') {
        filteredVacancies = filteredVacancies.filter(v => 
          v.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      // Remote work filter
      if (remote === 'true') {
        filteredVacancies = filteredVacancies.filter(v => v.remote);
      } else if (remote === 'false') {
        filteredVacancies = filteredVacancies.filter(v => !v.remote);
      }
      
      // Salary filter
      if (salary_min) {
        const minSalary = parseInt(salary_min);
        filteredVacancies = filteredVacancies.filter(v => {
          const salaryMatch = v.salary.match(/(\d+\s?\d*)\s?000/);
          if (salaryMatch) {
            const vacancySalary = parseInt(salaryMatch[1].replace(/\s/g, '')) * 1000;
            return vacancySalary >= minSalary;
          }
          return true;
        });
      }
      
      if (salary_max) {
        const maxSalary = parseInt(salary_max);
        filteredVacancies = filteredVacancies.filter(v => {
          const salaryMatch = v.salary.match(/(\d+\s?\d*)\s?000/);
          if (salaryMatch) {
            const vacancySalary = parseInt(salaryMatch[1].replace(/\s/g, '')) * 1000;
            return vacancySalary <= maxSalary;
          }
          return true;
        });
      }
      
      // Experience level filter
      if (experience) {
        filteredVacancies = filteredVacancies.filter(v => {
          const title = v.title.toLowerCase();
          switch (experience) {
            case 'junior':
              return title.includes('junior') || title.includes('начинающий');
            case 'middle':
              return !title.includes('junior') && !title.includes('senior') && !title.includes('lead');
            case 'senior':
              return title.includes('senior') || title.includes('lead');
            default:
              return true;
          }
        });
      }
      
      // Company filter
      if (company) {
        filteredVacancies = filteredVacancies.filter(v => 
          v.company.toLowerCase().includes(company.toLowerCase())
        );
      }
      
      // Tags filter
      if (tags) {
        const requiredTags = tags.split(',').map(tag => tag.trim().toLowerCase());
        filteredVacancies = filteredVacancies.filter(v => 
          requiredTags.some(tag => 
            v.tags.some(vTag => vTag.toLowerCase().includes(tag))
          )
        );
      }
      
      // Sorting
      if (sort_by) {
        filteredVacancies.sort((a, b) => {
          let compareValue = 0;
          
          switch (sort_by) {
            case 'salary':
              const aSalary = parseInt(a.salary.match(/(\d+)/)?.[1] || '0');
              const bSalary = parseInt(b.salary.match(/(\d+)/)?.[1] || '0');
              compareValue = aSalary - bSalary;
              break;
            case 'match':
              compareValue = a.aiMatch - b.aiMatch;
              break;
            case 'date':
              // Mock date comparison based on "posted" field
              const dateOrder = {
                'час': 1, 'часа': 1, 'часов': 1,
                'день': 2, 'дня': 2, 'дней': 2,
                'неделя': 7, 'недели': 7, 'недель': 7
              };
              const aOrder = Object.keys(dateOrder).find(key => a.posted.includes(key));
              const bOrder = Object.keys(dateOrder).find(key => b.posted.includes(key));
              const aValue = aOrder ? dateOrder[aOrder as keyof typeof dateOrder] || 0 : 0;
              const bValue = bOrder ? dateOrder[bOrder as keyof typeof dateOrder] || 0 : 0;
              compareValue = aValue - bValue;
              break;
            case 'company':
              compareValue = a.company.localeCompare(b.company);
              break;
            default:
              compareValue = a.title.localeCompare(b.title);
          }
          
          return order === 'desc' ? -compareValue : compareValue;
        });
      }
      
      // Pagination
      const totalCount = filteredVacancies.length;
      const startIndex = parseInt(offset || '0');
      const limitNum = parseInt(limit || '10');
      
      if (limit) {
        filteredVacancies = filteredVacancies.slice(startIndex, startIndex + limitNum);
      }

      const response: ApiResponse<Vacancy[]> = {
        success: true,
        data: filteredVacancies,
        message: 'Vacancies retrieved successfully',
        meta: {
          total: totalCount,
          count: filteredVacancies.length,
          offset: startIndex,
          limit: limitNum,
          hasMore: startIndex + limitNum < totalCount
        }
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