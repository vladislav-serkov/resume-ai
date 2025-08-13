import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  Star, 
  Zap,
  Target,
  TrendingUp,
  Briefcase,
  User,
  Bell,
  Settings,
  LogOut,
  Bot,
  Sparkles,
  Eye,
  Send,
  CheckCircle,
  AlertCircle,
  Filter
} from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    salary: '',
    experience: '',
    remote: false
  });
  const [activeTab, setActiveTab] = useState('search');

  // Mock data
  const mockVacancies = [
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

  const mockStats = {
    totalApplications: 24,
    responses: 8,
    interviews: 3,
    offers: 1,
    aiAdaptations: 45,
    autoResponses: 12
  };

  const getMatchColor = (match) => {
    if (match >= 90) return 'text-green-600 bg-green-100';
    if (match >= 70) return 'text-blue-600 bg-blue-100';
    if (match >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const handleApply = (vacancyId) => {
    navigate(`/vacancy/${vacancyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SmartCareer
                </h1>
              </div>
              
              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => setActiveTab('search')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'search' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Search className="h-4 w-4" />
                  <span>Поиск</span>
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'applications' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Мои отклики</span>
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Профиль</span>
                </button>
              </nav>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </span>
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
        {/* AI Status Bar */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI-Ассистент активен</h3>
                <p className="text-blue-100">Мониторинг новых вакансий • Автоотклик включен</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{mockStats.autoResponses}</div>
              <div className="text-blue-100 text-sm">автооткликов сегодня</div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-xl font-bold">{mockStats.totalApplications}</div>
              <div className="text-blue-100 text-sm">Всего откликов</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{mockStats.responses}</div>
              <div className="text-blue-100 text-sm">Ответов</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{mockStats.interviews}</div>
              <div className="text-blue-100 text-sm">Собеседований</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{mockStats.aiAdaptations}</div>
              <div className="text-blue-100 text-sm">AI-адаптаций</div>
            </div>
          </div>
        </div>

        {activeTab === 'search' && (
          <>
            {/* Search and filters */}
            <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Поиск вакансий..."
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <select
                    value={selectedFilters.location}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Город</option>
                    <option value="moscow">Москва</option>
                    <option value="spb">Санкт-Петербург</option>
                    <option value="novosibirsk">Новосибирск</option>
                  </select>
                  
                  <select
                    value={selectedFilters.salary}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, salary: e.target.value }))}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Зарплата</option>
                    <option value="100-150">100-150k</option>
                    <option value="150-250">150-250k</option>
                    <option value="250+">250k+</option>
                  </select>
                  
                  <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Фильтры</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Vacancies list */}
            <div className="space-y-6">
              {mockVacancies.map((vacancy) => (
                <div key={vacancy.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <img 
                        src={vacancy.logo} 
                        alt={`${vacancy.company} logo`}
                        className="w-12 h-12 rounded-xl"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                                {vacancy.title}
                              </h3>
                              {vacancy.isNew && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                  Новая
                                </span>
                              )}
                            </div>
                            <p className="text-lg font-medium text-gray-700 mb-2">{vacancy.company}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{vacancy.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{vacancy.salary}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{vacancy.posted}</span>
                              </div>
                              {vacancy.remote && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                  Удаленно
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(vacancy.aiMatch)}`}>
                              <div className="flex items-center space-x-1">
                                <Target className="h-3 w-3" />
                                <span>{vacancy.aiMatch}% соответствие</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{vacancy.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {vacancy.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => navigate(`/vacancy/${vacancy.id}`)}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Подробнее</span>
                      </button>
                      <button 
                        onClick={() => handleApply(vacancy.id)}
                        className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <Zap className="h-4 w-4" />
                        <span>AI-отклик</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Мои отклики</h2>
            
            <div className="space-y-4">
              {[
                { id: 1, position: "Senior Frontend Developer", company: "Яндекс", status: "interview", date: "2024-01-15" },
                { id: 2, position: "React Developer", company: "Avito", status: "response", date: "2024-01-14" },
                { id: 3, position: "Frontend Team Lead", company: "Сбер", status: "pending", date: "2024-01-12" },
                { id: 4, position: "Full Stack Developer", company: "Ozon", status: "rejected", date: "2024-01-10" }
              ].map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div>
                    <h3 className="font-semibold text-gray-900">{application.position}</h3>
                    <p className="text-gray-600">{application.company}</p>
                    <p className="text-sm text-gray-500">{new Date(application.date).toLocaleDateString('ru-RU')}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      application.status === 'interview' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'response' ? 'bg-green-100 text-green-800' :
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {
                        application.status === 'interview' ? 'Собеседование' :
                        application.status === 'response' ? 'Ответ получен' :
                        application.status === 'pending' ? 'Ожидание' :
                        'Отказ'
                      }
                    </span>
                    
                    <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Подробнее
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;