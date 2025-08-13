import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  MapPin, 
  Phone,
  Upload,
  Download,
  Edit,
  Save,
  X,
  CheckCircle,
  FileText,
  Sparkles,
  Bot,
  TrendingUp,
  Bell,
  LogOut,
  Settings,
  Eye,
  Zap,
  Target
} from 'lucide-react';

const ProfilePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+7 (999) 123-45-67',
    location: 'Москва',
    position: user.position,
    experience: '5+ лет',
    about: 'Опытный Frontend разработчик с глубокими знаниями React, TypeScript и современных технологий веб-разработки. Имею опыт руководства командой и менторства junior разработчиков.',
    skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Redux', 'Next.js', 'GraphQL', 'Jest', 'Docker', 'AWS'],
    salary: '200 000 - 350 000 ₽',
    employment: 'Полная занятость',
    remote: true
  });

  const mockResumes = [
    {
      id: 1,
      name: 'Основное резюме',
      isOriginal: true,
      uploadDate: '2024-01-10',
      adaptations: 15,
      lastUsed: '2024-01-15'
    },
    {
      id: 2,
      name: 'Адаптированное для Яндекс',
      isOriginal: false,
      baseVacancy: 'Senior Frontend Developer - Яндекс',
      adaptationDate: '2024-01-15',
      matchScore: 92
    },
    {
      id: 3,
      name: 'Адаптированное для Avito',
      isOriginal: false,
      baseVacancy: 'React Developer - Avito',
      adaptationDate: '2024-01-14',
      matchScore: 87
    }
  ];

  const mockStats = {
    totalApplications: 24,
    aiAdaptations: 45,
    responses: 8,
    interviews: 3,
    successRate: 33
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulate API call
    console.log('Saving profile data:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset data
    setProfileData({
      name: user.name,
      email: user.email,
      phone: '+7 (999) 123-45-67',
      location: 'Москва',
      position: user.position,
      experience: '5+ лет',
      about: 'Опытный Frontend разработчик с глубокими знаниями React, TypeScript и современных технологий веб-разработки.',
      skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Redux', 'Next.js', 'GraphQL', 'Jest', 'Docker', 'AWS'],
      salary: '200 000 - 350 000 ₽',
      employment: 'Полная занятость',
      remote: true
    });
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className="h-24 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {user.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
                <p className="text-xl text-gray-700 mb-2">{profileData.position}</p>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>{profileData.phone}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Активный поиск
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Готов к удаленной работе
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Редактировать</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Сохранить</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Отмена</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="h-4 w-4 inline-block mr-2" />
                Профиль
              </button>
              <button
                onClick={() => setActiveTab('resumes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'resumes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-4 w-4 inline-block mr-2" />
                Резюме
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <TrendingUp className="h-4 w-4 inline-block mr-2" />
                Статистика
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="h-4 w-4 inline-block mr-2" />
                Настройки
              </button>
            </nav>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Основная информация</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Город</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.location}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">О себе</h3>
                {isEditing ? (
                  <textarea
                    value={profileData.about}
                    onChange={(e) => handleInputChange('about', e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{profileData.about}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Job Preferences */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Предпочтения по работе</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Желаемая должность</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.position}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Зарплатные ожидания</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.salary}
                        onChange={(e) => handleInputChange('salary', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.salary}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тип занятости</label>
                    {isEditing ? (
                      <select
                        value={profileData.employment}
                        onChange={(e) => handleInputChange('employment', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Полная занятость">Полная занятость</option>
                        <option value="Частичная занятость">Частичная занятость</option>
                        <option value="Проектная работа">Проектная работа</option>
                        <option value="Стажировка">Стажировка</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{profileData.employment}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {isEditing ? (
                      <input
                        type="checkbox"
                        checked={profileData.remote}
                        onChange={(e) => handleInputChange('remote', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    ) : (
                      <CheckCircle className={`h-5 w-5 ${profileData.remote ? 'text-green-600' : 'text-gray-400'}`} />
                    )}
                    <span className="text-gray-700">Готов к удаленной работе</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Навыки</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    + Добавить навык
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Resumes Tab */}
        {activeTab === 'resumes' && (
          <div className="space-y-6">
            {/* Upload new resume */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Управление резюме</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>Загрузить новое</span>
                </button>
              </div>

              <div className="space-y-4">
                {mockResumes.map((resume) => (
                  <div key={resume.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                          resume.isOriginal ? 'bg-blue-100' : 'bg-purple-100'
                        }`}>
                          {resume.isOriginal ? (
                            <FileText className={`h-6 w-6 ${resume.isOriginal ? 'text-blue-600' : 'text-purple-600'}`} />
                          ) : (
                            <Sparkles className="h-6 w-6 text-purple-600" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="font-semibold text-gray-900">{resume.name}</h4>
                            {resume.isOriginal && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                Оригинал
                              </span>
                            )}
                            {!resume.isOriginal && (
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                  AI-адаптация
                                </span>
                                {resume.matchScore && (
                                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                                    <Target className="h-3 w-3" />
                                    <span>{resume.matchScore}%</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {resume.isOriginal ? (
                            <div className="text-sm text-gray-600">
                              <p>Загружено: {new Date(resume.uploadDate).toLocaleDateString('ru-RU')}</p>
                              <p>Адаптаций: {resume.adaptations} • Последнее использование: {new Date(resume.lastUsed).toLocaleDateString('ru-RU')}</p>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-600">
                              <p>Для вакансии: {resume.baseVacancy}</p>
                              <p>Создано: {new Date(resume.adaptationDate).toLocaleDateString('ru-RU')}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">Просмотр</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                          <Download className="h-4 w-4" />
                          <span className="text-sm">Скачать</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{mockStats.totalApplications}</div>
                <div className="text-sm text-gray-600">Всего откликов</div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Bot className="h-6 w-6 text-purple-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{mockStats.aiAdaptations}</div>
                <div className="text-sm text-gray-600">AI-адаптаций</div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{mockStats.responses}</div>
                <div className="text-sm text-gray-600">Ответов получено</div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{mockStats.successRate}%</div>
                <div className="text-sm text-gray-600">Успешность откликов</div>
              </div>
            </div>

            {/* Charts placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Активность за месяц</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
                График активности (будет добавлен)
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Настройки AI-ассистента</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Автоотклик</h4>
                    <p className="text-sm text-gray-600">Автоматически отправлять отклики на подходящие вакансии</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Уведомления о новых вакансиях</h4>
                    <p className="text-sm text-gray-600">Получать push-уведомления о подходящих вакансиях</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Еженедельные отчеты</h4>
                    <p className="text-sm text-gray-600">Получать отчеты об активности и статистике</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Безопасность</h3>
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  Изменить пароль
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  Двухфакторная аутентификация
                </button>
                <button className="w-full text-left px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:border-red-400 transition-colors">
                  Удалить аккаунт
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;