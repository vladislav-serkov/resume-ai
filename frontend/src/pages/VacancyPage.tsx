import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  Users,
  Zap,
  CheckCircle,
  Eye,
  Bot,
  TrendingUp,
  User,
  Bell,
  LogOut
} from 'lucide-react';

interface User {
  name: string;
  position: string;
  avatar: string;
  email: string;
}

interface VacancyPageProps {
  user: User;
  onLogout: () => void;
}

const VacancyPage: React.FC<VacancyPageProps> = ({ user, onLogout }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);
  const [showAIAnalysis, setShowAIAnalysis] = useState(true);

  // Mock vacancy data
  const vacancy = {
    id: parseInt(id || '1'),
    title: "Senior Frontend Developer",
    company: "Яндекс",
    location: "Москва",
    salary: "200 000 - 350 000 ₽",
    type: "Полная занятость",
    posted: "2 часа назад",
    views: 156,
    applications: 23,
    logo: "https://via.placeholder.com/64/FF0000/FFFFFF?text=Я",
    remote: false,
    
    description: `Команда Яндекс.Маркета ищет опытного Frontend разработчика для работы над ключевыми продуктами компании.

Вы будете работать с современным стеком технологий и участвовать в разработке интерфейсов, которыми пользуются миллионы людей каждый день.

Мы предлагаем:
• Работу в сильной команде профессионалов
• Интересные и сложные задачи
• Возможности для профессионального роста
• Современный офис в центре Москвы
• Гибкий график работы
• ДМС для сотрудника и семьи
• Корпоративное обучение и конференции`,

    requirements: [
      "Опыт коммерческой разработки на React от 3 лет",
      "Глубокое знание JavaScript (ES6+), TypeScript",
      "Опыт работы с Redux или другими state management решениями",
      "Знание принципов REST API, работа с асинхронными запросами",
      "Опыт написания unit и интеграционных тестов (Jest, React Testing Library)",
      "Понимание принципов responsive design и кроссбраузерности",
      "Опыт работы с Git и системами сборки (Webpack, Vite)",
      "Английский язык на уровне чтения технической документации"
    ],

    nice: [
      "Опыт работы с Next.js или другими SSR фреймворками",
      "Знание принципов микрофронтендов",
      "Опыт работы с GraphQL",
      "Понимание принципов DevOps и CI/CD",
      "Опыт менторства и работы с junior разработчиками"
    ],

    responsibilities: [
      "Разработка новых функций и поддержка существующего кода",
      "Участие в архитектурных решениях и code review",
      "Оптимизация производительности приложений",
      "Написание покрытого тестами, поддерживаемого кода",
      "Взаимодействие с дизайнерами, продакт-менеджерами и backend разработчиками",
      "Участие в планировании и оценке задач"
    ],

    tags: ["React", "TypeScript", "Redux", "JavaScript", "Jest", "Webpack"]
  };

  // AI Analysis data
  const aiAnalysis = {
    matchScore: 92,
    strengths: [
      "Ваш опыт React (5+ лет) превышает требования",
      "TypeScript - точное совпадение с вашими навыками",
      "Опыт с Redux указан в вашем резюме",
      "Jest - есть опыт тестирования в портфолио"
    ],
    improvements: [
      "Добавить упоминание о microservices архитектуре",
      "Подчеркнуть опыт менторства junior разработчиков",
      "Выделить проекты с высокой нагрузкой"
    ],
    adaptedSections: [
      "Опыт работы будет переписан с акцентом на React/TypeScript проекты",
      "Навыки будут переупорядочены по приоритету для данной вакансии",
      "Добавлен блок с релевантными достижениями"
    ],
    coverLetterPreview: `Здравствуйте!

С большим интересом рассматриваю позицию Senior Frontend Developer в команде Яндекс.Маркета. 

Мой 5-летний опыт разработки на React и глубокие знания TypeScript позволят мне эффективно решать поставленные задачи. В последнем проекте я руководил frontend-командой из 4 человек и успешно мигрировал legacy-код на современный стек React + TypeScript.

Особенно привлекает возможность работать с продуктами такого масштаба и в команде профессионалов.

Готов обсудить детали на собеседовании.

С уважением,
${user.name}`
  };

  const handleApply = async () => {
    setIsApplying(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsApplying(false);
      setApplicationSent(true);
    }, 3000);
  };

  const getMatchColor = (score: number): string => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 70) return 'from-blue-500 to-cyan-500';
    if (score >= 50) return 'from-orange-500 to-yellow-500';
    return 'from-red-500 to-pink-500';
  };

  if (applicationSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Отклик отправлен!</h2>
            <p className="text-gray-600 mb-6">
              Ваше резюме было автоматически адаптировано под требования вакансии и отправлено работодателю.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity font-semibold"
              >
                Вернуться к поиску
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors"
              >
                Посмотреть адаптированное резюме
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Назад к поиску</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.position}</p>
                </div>
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.avatar}
                </div>
              </div>
              
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vacancy header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-start space-x-6">
                <img 
                  src={vacancy.logo} 
                  alt={`${vacancy.company} logo`}
                  className="w-16 h-16 rounded-2xl"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{vacancy.title}</h1>
                  <p className="text-xl text-gray-700 mb-4">{vacancy.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>{vacancy.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5" />
                      <span>{vacancy.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>{vacancy.posted}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5" />
                      <span>{vacancy.views} просмотров</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>{vacancy.applications} откликов</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {vacancy.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Описание вакансии</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {vacancy.description}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Требования</h2>
              <ul className="space-y-3">
                {vacancy.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to have */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Будет плюсом</h2>
              <ul className="space-y-3">
                {vacancy.nice.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full mt-1 flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Analysis */}
            {showAIAnalysis && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Bot className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">AI-Анализ</h3>
                  </div>
                  <button 
                    onClick={() => setShowAIAnalysis(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                {/* Match score */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Соответствие профилю</span>
                    <span className="text-2xl font-bold text-gray-900">{aiAnalysis.matchScore}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getMatchColor(aiAnalysis.matchScore)} transition-all duration-1000`}
                      style={{ width: `${aiAnalysis.matchScore}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-green-600 mt-2 font-medium">Отличное соответствие!</p>
                </div>

                {/* Strengths */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Ваши преимущества
                  </h4>
                  <ul className="space-y-2">
                    {aiAnalysis.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                    Рекомендации для адаптации
                  </h4>
                  <ul className="space-y-2">
                    {aiAnalysis.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Application panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Готовы откликнуться?</h3>
                <p className="text-sm text-gray-600">
                  AI автоматически адаптирует ваше резюме под эту вакансию и отправит отклик
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity font-semibold"
                >
                  {isApplying ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Адаптирую резюме...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" />
                      <span>Отправить AI-отклик</span>
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                    Предварительный просмотр адаптации
                  </button>
                </div>
              </div>

              {isApplying && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-blue-900 font-medium mb-1">AI обрабатывает вашу заявку:</p>
                      <div className="space-y-1 text-blue-700">
                        <p>✓ Анализ требований завершен</p>
                        <p>🔄 Адаптация резюме...</p>
                        <p className="opacity-50">⏳ Генерация сопроводительного письма</p>
                        <p className="opacity-50">⏳ Отправка работодателю</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Company info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">О компании</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{vacancy.company}</p>
                    <p className="text-sm text-gray-600">IT, Интернет, Телеком</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-900">10,000+ сотрудников</p>
                    <p className="text-sm text-gray-600">Международная компания</p>
                  </div>
                </div>
                <button className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium py-2 transition-colors">
                  Подробнее о компании
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyPage;