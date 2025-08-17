import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { useApiData, useApiCall } from '../hooks/useApi';
import NotificationCenter from '../components/NotificationCenter';
import LoadingSpinner from '../components/LoadingSpinner';
import VacancyAnalysis from '../components/VacancyAnalysis';
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

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    salary_min: '',
    salary_max: '',
    experience: '',
    remote: '',
    company: '',
    tags: ''
  });
  const [activeTab, setActiveTab] = useState('search');

  // API hooks for data fetching
  const { 
    data: vacancies = [], 
    loading: vacanciesLoading, 
    error: vacanciesError,
    refetch: refetchVacancies 
  } = useApiData(() => {
    const filters = {
      query: searchQuery,
      ...selectedFilters
    };
    // Remove empty filters
    Object.keys(filters).forEach(key => {
      if (!filters[key]) delete filters[key];
    });
    return apiService.vacancies.search(filters);
  }, [searchQuery, selectedFilters], {
    showErrorToast: false // Handle errors manually
  });

  const { 
    data: stats = {},
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats
  } = useApiData(() => apiService.stats.get(), [], {
    showErrorToast: false
  });

  const { 
    data: applications = [],
    loading: applicationsLoading,
    error: applicationsError,
    refetch: refetchApplications
  } = useApiData(() => apiService.applications.getAll(), [], {
    showErrorToast: false
  });

  // Search handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    refetchVacancies();
  };

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      location: '',
      salary_min: '',
      salary_max: '',
      experience: '',
      remote: '',
      company: '',
      tags: ''
    });
    setSearchQuery('');
  };

  // Get actual vacancy data from API or fallback to empty array
  const displayVacancies = vacancies?.data || [];
  
  // Get actual stats data from API
  const displayStats = stats?.data || {
    totalApplications: 0,
    responses: 0,
    interviews: 0,
    offers: 0,
    aiAdaptations: 0,
    autoResponses: 0
  };

  // Error handling components
  const ErrorMessage = ({ message, onRetry, className = "" }) => (
    <div className={`text-center py-8 ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <div>
          <p className="text-gray-600 mb-2">Произошла ошибка при загрузке данных</p>
          {message && (
            <p className="text-sm text-gray-500">{message}</p>
          )}
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Попробовать снова
          </button>
        )}
      </div>
    </div>
  );

  const StatsErrorFallback = () => (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
      <div className="flex items-center space-x-3">
        <AlertCircle className="h-6 w-6 text-red-600" />
        <div>
          <h3 className="text-red-800 font-medium">Ошибка загрузки статистики</h3>
          <p className="text-red-600 text-sm">Не удалось загрузить данные статистики</p>
        </div>
        <button
          onClick={refetchStats}
          className="ml-auto px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
        >
          Обновить
        </button>
      </div>
    </div>
  );

  const getMatchColor = (match) => {
    if (match >= 90) return 'text-green-600 bg-green-100';
    if (match >= 70) return 'text-blue-600 bg-blue-100';
    if (match >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  // API call for creating application
  const { execute: submitApplication, loading: applicationSubmitting } = useApiCall(
    (vacancyData) => apiService.applications.create({
      vacancyId: vacancyData.id,
      position: vacancyData.title,
      company: vacancyData.company
    }),
    {
      successMessage: 'Отклик успешно отправлен!',
      onSuccess: (data) => {
        // Refresh applications list
        refetchApplications();
        // Refresh stats
        refetchStats();
      }
    }
  );

  const handleApply = async (vacancy) => {
    await submitApplication(vacancy);
  };

  // API call for updating application status
  const { execute: updateApplicationStatus } = useApiCall(
    ({ id, status }) => apiService.applications.updateStatus(id, status),
    {
      successMessage: 'Статус заявки обновлен',
      onSuccess: () => {
        refetchApplications();
        refetchStats();
      }
    }
  );

  const handleStatusChange = async (applicationId, newStatus) => {
    await updateApplicationStatus({ id: applicationId, status: newStatus });
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
                  onClick={() => setActiveTab('analysis')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'analysis' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Bot className="h-4 w-4" />
                  <span>AI Анализ</span>
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
              <NotificationCenter user={user} />
              
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
                onClick={logout}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Error handling for stats */}
        {statsError && <StatsErrorFallback />}
        
        {/* AI Status Bar */}
        {!statsError && (
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
              <div className="text-2xl font-bold">{displayStats.autoResponses}</div>
              <div className="text-blue-100 text-sm">автооткликов сегодня</div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-xl font-bold">{displayStats.totalApplications}</div>
              <div className="text-blue-100 text-sm">Всего откликов</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{displayStats.responses}</div>
              <div className="text-blue-100 text-sm">Ответов</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{displayStats.interviews}</div>
              <div className="text-blue-100 text-sm">Собеседований</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{displayStats.aiAdaptations}</div>
              <div className="text-blue-100 text-sm">AI-адаптаций</div>
            </div>
          </div>
        </div>
        )}

        {activeTab === 'search' && (
          <>
            {/* Search and filters */}
            <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <form onSubmit={handleSearchSubmit}>
                <div className="flex flex-col lg:flex-row gap-4 mb-4">
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
                  
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Найти
                  </button>
                </div>
                
                {/* Advanced filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <select
                    value={selectedFilters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Город</option>
                    <option value="Москва">Москва</option>
                    <option value="Санкт-Петербург">Санкт-Петербург</option>
                    <option value="Новосибирск">Новосибирск</option>
                    <option value="Удаленно">Удаленно</option>
                  </select>
                  
                  <input
                    type="number"
                    value={selectedFilters.salary_min}
                    onChange={(e) => handleFilterChange('salary_min', e.target.value)}
                    placeholder="Зарплата от"
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  
                  <select
                    value={selectedFilters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Опыт</option>
                    <option value="junior">Junior</option>
                    <option value="middle">Middle</option>
                    <option value="senior">Senior</option>
                  </select>
                  
                  <select
                    value={selectedFilters.remote}
                    onChange={(e) => handleFilterChange('remote', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Формат работы</option>
                    <option value="true">Удаленно</option>
                    <option value="false">Офис</option>
                  </select>
                </div>
                
                {/* Clear filters */}
                {(searchQuery || Object.values(selectedFilters).some(v => v)) && (
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Очистить фильтры
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Vacancies list */}
            <div className="space-y-6">
              {vacanciesError ? (
                <ErrorMessage 
                  message="Не удалось загрузить список вакансий"
                  onRetry={refetchVacancies}
                />
              ) : vacanciesLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : displayVacancies.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Вакансии не найдены</p>
                  <button 
                    onClick={clearFilters}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Очистить фильтры
                  </button>
                </div>
              ) : (
                displayVacancies.map((vacancy) => (
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
                        onClick={() => handleApply(vacancy)}
                        disabled={applicationSubmitting}
                        className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Zap className="h-4 w-4" />
                        <span>{applicationSubmitting ? 'Отправка...' : 'AI-отклик'}</span>
                      </button>
                    </div>
                  </div>
                </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'analysis' && (
          <VacancyAnalysis />
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Мои отклики</h2>
            
            {applicationsError ? (
              <ErrorMessage 
                message="Не удалось загрузить список откликов"
                onRetry={refetchApplications}
              />
            ) : applicationsLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : (applications?.data || []).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">У вас пока нет откликов</p>
              </div>
            ) : (
              <div className="space-y-4">
                {(applications?.data || []).map((application) => (
                <div key={application.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{application.position}</h3>
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
                      </div>
                      <p className="text-gray-700 font-medium mb-1">{application.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Отправлено: {new Date(application.date).toLocaleDateString('ru-RU')}</span>
                        {application.updatedAt && application.updatedAt !== application.appliedAt && (
                          <span>Обновлено: {new Date(application.updatedAt).toLocaleDateString('ru-RU')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <select 
                        value={application.status}
                        onChange={(e) => handleStatusChange(application.id, e.target.value)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pending">Ожидание</option>
                        <option value="response">Ответ получен</option>
                        <option value="interview">Собеседование</option>
                        <option value="rejected">Отказ</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => navigate(`/applications/${application.id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        Подробнее
                      </button>
                      <button 
                        onClick={() => navigate(`/vacancy/${application.vacancyId}`)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                      >
                        Вакансия
                      </button>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;