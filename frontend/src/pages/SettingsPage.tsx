import React, { useState } from 'react';
import { Bot, Bell, Save, DollarSign, MapPin, Shield, Building, Zap, Target } from 'lucide-react';

interface AISettings {
  salaryMin: string;
  salaryMax: string;
  employmentType: string;
  reliability: string;
  blacklistedCompanies: string[];
  atsOptimization: string;
  experienceAdaptation: string;
}

/**
 * Страница настроек - конфигурация AI агента и уведомлений
 */
const SettingsPage: React.FC = () => {
  const [aiSettings, setAiSettings] = useState<AISettings>({
    salaryMin: '80000',
    salaryMax: '150000',
    employmentType: 'hybrid',
    reliability: 'medium',
    blacklistedCompanies: ['Компания А', 'Компания Б'],
    atsOptimization: 'medium',
    experienceAdaptation: 'balanced'
  });

  const [newCompany, setNewCompany] = useState('');

  const handleAiSettingChange = (key: keyof AISettings, value: string | string[]) => {
    setAiSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  const addBlacklistedCompany = () => {
    if (newCompany.trim()) {
      setAiSettings(prev => ({
        ...prev,
        blacklistedCompanies: [...prev.blacklistedCompanies, newCompany.trim()]
      }));
      setNewCompany('');
    }
  };

  const removeBlacklistedCompany = (company: string) => {
    setAiSettings(prev => ({
      ...prev,
      blacklistedCompanies: prev.blacklistedCompanies.filter(c => c !== company)
    }));
  };

  const handleSave = () => {
    // Здесь будет логика сохранения настроек
    console.log('Saving settings:', { aiSettings, notificationSettings });
    // Показать уведомление об успешном сохранении
  };

  const employmentOptions = [
    { value: 'remote', label: 'Удаленка' },
    { value: 'office', label: 'Офис' },
    { value: 'hybrid', label: 'Гибрид' }
  ];

  const reliabilityOptions = [
    { value: 'low', label: 'Низкая' },
    { value: 'medium', label: 'Средняя' },
    { value: 'high', label: 'Высокая' }
  ];

  const atsOptimizationOptions = [
    { value: 'low', label: 'Низкая' },
    { value: 'medium', label: 'Средняя' },
    { value: 'high', label: 'Высокая' }
  ];

  const experienceAdaptationOptions = [
    { value: 'minimal', label: 'Минимальная' },
    { value: 'balanced', label: 'Сбалансированная' },
    { value: 'maximum', label: 'Максимальная' }
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-600 mt-1">
          Конфигурация AI агента и уведомлений
        </p>
      </div>

      {/* AI Agent Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Bot className="h-6 w-6 mr-3 text-blue-600" />
          Настройки AI агента
        </h2>

        <div className="space-y-6">
          {/* Salary Range */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              Зарплата
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Минимальная зарплата (₽)
                </label>
                <input
                  type="number"
                  value={aiSettings.salaryMin}
                  onChange={(e) => handleAiSettingChange('salaryMin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Максимальная зарплата (₽)
                </label>
                <input
                  type="number"
                  value={aiSettings.salaryMax}
                  onChange={(e) => handleAiSettingChange('salaryMax', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Employment Type */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-orange-600" />
              Тип занятости
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {employmentOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAiSettingChange('employmentType', option.value)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    aiSettings.employmentType === option.value
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reliability */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-purple-600" />
              Достоверность
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {reliabilityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAiSettingChange('reliability', option.value)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    aiSettings.reliability === option.value
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Blacklisted Companies */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Building className="h-5 w-5 mr-2 text-red-600" />
              Черный список компаний
            </h3>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addBlacklistedCompany()}
                  placeholder="Добавить компанию в черный список"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={addBlacklistedCompany}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Добавить
                </button>
              </div>
              
              {aiSettings.blacklistedCompanies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {aiSettings.blacklistedCompanies.map((company, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                    >
                      {company}
                      <button
                        onClick={() => removeBlacklistedCompany(company)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ATS Optimization */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-600" />
              ATS-оптимизация
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {atsOptimizationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAiSettingChange('atsOptimization', option.value)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    aiSettings.atsOptimization === option.value
                      ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Adaptation */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Target className="h-5 w-5 mr-2 text-indigo-600" />
              Степень адаптации опыта
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {experienceAdaptationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAiSettingChange('experienceAdaptation', option.value)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    aiSettings.experienceAdaptation === option.value
                      ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Bell className="h-6 w-6 mr-3 text-green-600" />
          Настройки уведомлений Telegram
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">Отчет по каждому отклику</h3>
              <p className="text-sm text-gray-600">
                Получать уведомление о каждом отправленном отклике
              </p>
            </div>
            <button
              onClick={() => handleNotificationChange('responseReport', !notificationSettings.responseReport)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                notificationSettings.responseReport ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                  notificationSettings.responseReport ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-gray-900">Ежедневный отчет со статистикой</h3>
              <p className="text-sm text-gray-600">
                Ежедневная сводка по активности и статистике
              </p>
            </div>
            <button
              onClick={() => handleNotificationChange('dailyReport', !notificationSettings.dailyReport)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                notificationSettings.dailyReport ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                  notificationSettings.dailyReport ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Save className="h-5 w-5" />
          <span>Сохранить настройки</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;