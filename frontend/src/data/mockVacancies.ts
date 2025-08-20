import { Vacancy, VacancyAnalysis } from '../types';

export const mockVacancies: Vacancy[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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

export const mockVacancyAnalysis: VacancyAnalysis = {
  requiredSkills: ['React', 'TypeScript', 'Node.js', 'Team Leadership', 'Agile'],
  optionalSkills: ['Docker', 'AWS', 'GraphQL'],
  experienceLevel: 'Senior (5+ лет)',
  keyRequirements: [
    'Опыт разработки на React/TypeScript от 3 лет',
    'Знание современных инструментов разработки',
    'Опыт работы в команде и менторства',
    'Знание принципов Agile/Scrum'
  ],
  matchScore: 85,
  recommendations: [
    'Подчеркните опыт работы с TypeScript',
    'Добавьте примеры командной работы',
    'Упомяните знание Agile методологий',
    'Выделите лидерские качества'
  ],
  salaryRange: '200,000 - 300,000 ₽',
  location: 'Москва (возможна удаленная работа)',
  companyType: 'Продуктовая IT-компания'
};