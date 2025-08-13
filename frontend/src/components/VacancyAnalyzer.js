import React, { useState } from 'react';
import { Sparkles, Target, TrendingUp, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const VacancyAnalyzer = ({ vacancyText, onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeVacancy = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
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
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
      onAnalysisComplete?.(mockAnalysis);
    }, 2000);
  };

  if (!vacancyText) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
        <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Анализ вакансии</h3>
        <p className="text-gray-600">Вставьте текст вакансии для анализа требований</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Target className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Анализ вакансии</h2>
        </div>
        
        {!analysis && (
          <button
            onClick={analyzeVacancy}
            disabled={isAnalyzing}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isAnalyzing ? 'Анализирую...' : 'Анализировать'}</span>
          </button>
        )}
      </div>

      {isAnalyzing && (
        <div className="flex items-center justify-center space-x-3 p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Анализирую требования вакансии...</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Это займет несколько секунд</span>
            </div>
          </div>
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* Match Score */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Соответствие профилю</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${analysis.matchScore}%` }}
                  ></div>
                </div>
                <span className="text-lg font-bold text-green-600">{analysis.matchScore}%</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-700">Высокое соответствие требованиям</span>
            </div>
          </div>

          {/* Key Requirements */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Ключевые требования</h3>
            <div className="space-y-2">
              {analysis.keyRequirements.map((req, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Обязательные навыки</h3>
              <div className="space-y-2">
                {analysis.requiredSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg border border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Желательные навыки</h3>
              <div className="space-y-2">
                {analysis.optionalSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-1">Уровень</h4>
              <p className="text-sm text-gray-600">{analysis.experienceLevel}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-1">Зарплата</h4>
              <p className="text-sm text-gray-600">{analysis.salaryRange}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-1">Расположение</h4>
              <p className="text-sm text-gray-600">{analysis.location}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Рекомендации для адаптации резюме</h3>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Sparkles className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-yellow-800">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacancyAnalyzer;