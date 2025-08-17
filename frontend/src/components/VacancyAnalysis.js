import React, { useState } from 'react';
import { apiService } from '../services/api';
import { useApiCall, useApiData } from '../hooks/useApi';
import LoadingSpinner from './LoadingSpinner';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Lightbulb,
  Star,
  Copy,
  Download,
  Eye,
  Trash2,
  Sparkles
} from 'lucide-react';

const VacancyAnalysis = ({ onAnalysisComplete }) => {
  const [vacancyText, setVacancyText] = useState('');
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [activeTab, setActiveTab] = useState('analyze');

  // Get resumes for selection
  const { data: resumes = [] } = useApiData(() => apiService.resumes.getAll(), []);

  // Get analysis history
  const { 
    data: analysisHistory = [],
    loading: historyLoading,
    refetch: refetchHistory
  } = useApiData(() => apiService.ai.getAnalysisHistory(), [], {
    showErrorToast: false
  });

  // API calls
  const { 
    execute: analyzeVacancy, 
    loading: analyzing, 
    data: analysisResult 
  } = useApiCall(
    () => apiService.ai.analyzeVacancy(vacancyText, selectedResumeId || null),
    {
      successMessage: 'Анализ выполнен успешно!',
      onSuccess: (result) => {
        refetchHistory();
        if (onAnalysisComplete) {
          onAnalysisComplete(result.data);
        }
      }
    }
  );

  const { execute: deleteAnalysis } = useApiCall(
    (id) => apiService.ai.deleteAnalysis(id),
    {
      successMessage: 'Анализ удален',
      onSuccess: () => {
        refetchHistory();
      }
    }
  );

  const { execute: generateAdaptation } = useApiCall(
    ({ analysisId, resumeId }) => apiService.ai.generateResumeAdaptation(analysisId, resumeId),
    {
      successMessage: 'Адаптация резюме создана!',
    }
  );

  const handleAnalyze = async () => {
    if (!vacancyText.trim()) {
      return;
    }
    await analyzeVacancy();
  };

  const handleDeleteAnalysis = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот анализ?')) {
      await deleteAnalysis(id);
    }
  };

  const handleGenerateAdaptation = async (analysisId) => {
    if (!selectedResumeId) {
      alert('Пожалуйста, выберите резюме для адаптации');
      return;
    }
    await generateAdaptation({ analysisId, resumeId: selectedResumeId });
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const AnalysisResultCard = ({ analysis }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Brain className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Анализ вакансии</h3>
            <p className="text-sm text-gray-600">
              {new Date(analysis.createdAt).toLocaleDateString('ru-RU')}
            </p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${getMatchColor(analysis.matching.matchScore)}`}>
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>{analysis.matching.matchScore}% соответствие</span>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vacancy Analysis */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Анализ вакансии</span>
          </h4>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Уровень опыта</p>
              <p className="text-gray-600">{analysis.analysis.experienceLevel}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700">Зарплатная вилка</p>
              <p className="text-gray-600">{analysis.analysis.salaryRange}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700">Формат работы</p>
              <p className="text-gray-600">{analysis.analysis.workFormat}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Обязательные навыки</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {analysis.analysis.requiredSkills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Желательные навыки</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {analysis.analysis.optionalSkills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Matching Analysis */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Анализ соответствия</span>
          </h4>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span>Сильные стороны</span>
              </p>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                {analysis.matching.strongPoints.map((point, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <AlertCircle className="h-3 w-3 text-orange-600" />
                <span>Недостающие навыки</span>
              </p>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                {analysis.matching.missingSkills.map((skill, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-orange-600 rounded-full"></div>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Lightbulb className="h-3 w-3 text-blue-600" />
                <span>Рекомендации</span>
              </p>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                {analysis.matching.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-blue-600 rounded-full mt-2"></div>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Optimization */}
      {analysis.resumeOptimization && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 flex items-center space-x-2 mb-4">
            <TrendingUp className="h-4 w-4" />
            <span>Оптимизация резюме</span>
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Предлагаемые изменения</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {analysis.resumeOptimization.suggestedChanges.map((change, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-purple-600 rounded-full mt-2"></div>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Ключевые слова</p>
              <div className="flex flex-wrap gap-1">
                {analysis.resumeOptimization.keywordsToAdd.map((keyword, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Разделы для улучшения</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {analysis.resumeOptimization.sectionsToImprove.map((section, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-yellow-600 rounded-full"></div>
                    <span>{section}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleGenerateAdaptation(analysis.id)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            <span>Адаптировать резюме</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-800 rounded-lg transition-colors">
            <Copy className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleDeleteAnalysis(analysis.id)}
            className="p-2 text-gray-600 hover:text-red-600 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const HistoryCard = ({ analysis }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-medium text-gray-900 truncate">
              {analysis.vacancyText.substring(0, 50)}...
            </h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(analysis.matching.matchScore)}`}>
              {analysis.matching.matchScore}%
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {new Date(analysis.createdAt).toLocaleDateString('ru-RU')}
          </p>
        </div>
        
        <div className="flex items-center space-x-1">
          <button className="p-1 text-gray-600 hover:text-gray-800 rounded transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleDeleteAnalysis(analysis.id)}
            className="p-1 text-gray-600 hover:text-red-600 rounded transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {analysis.analysis.requiredSkills.slice(0, 3).map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            {skill}
          </span>
        ))}
        {analysis.analysis.requiredSkills.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{analysis.analysis.requiredSkills.length - 3}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('analyze')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'analyze' 
              ? 'bg-purple-100 text-purple-700' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Анализ вакансии
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'history' 
              ? 'bg-purple-100 text-purple-700' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          История анализов
        </button>
      </div>

      {activeTab === 'analyze' && (
        <>
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Анализ вакансии с ИИ</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Выберите резюме для анализа (опционально)
                </label>
                <select
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Без привязки к резюме</option>
                  {(resumes?.data || []).map((resume) => (
                    <option key={resume.id} value={resume.id}>
                      {resume.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Текст вакансии
                </label>
                <textarea
                  value={vacancyText}
                  onChange={(e) => setVacancyText(e.target.value)}
                  placeholder="Вставьте сюда полный текст вакансии для анализа..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={analyzing || !vacancyText.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {analyzing ? (
                  <>
                    <LoadingSpinner />
                    <span>Анализирую...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5" />
                    <span>Анализировать вакансию</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analysis Result */}
          {analysisResult?.data && (
            <AnalysisResultCard analysis={analysisResult.data} />
          )}
        </>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">История анализов</h3>
          
          {historyLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (analysisHistory?.data || []).length === 0 ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Пока нет выполненных анализов</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {(analysisHistory?.data || []).map((analysis) => (
                <HistoryCard key={analysis.id} analysis={analysis} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VacancyAnalysis;