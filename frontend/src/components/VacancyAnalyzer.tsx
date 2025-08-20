import React, { useState } from 'react';
import { Sparkles, Target, TrendingUp, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { VacancyAnalyzerProps, VacancyAnalysis } from '../types';
import { mockVacancyAnalysis } from '../data/mockVacancies';

/**
 * Component for analyzing job vacancy requirements and matching with user profile
 */
const VacancyAnalyzer: React.FC<VacancyAnalyzerProps> = ({ 
  vacancyText, 
  onAnalysisComplete 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<VacancyAnalysis | null>(null);

  /**
   * Analyze vacancy text and generate recommendations
   */
  const analyzeVacancy = async (): Promise<void> => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnalysis(mockVacancyAnalysis);
      onAnalysisComplete?.(mockVacancyAnalysis);
    } catch (error) {
      console.error('Error analyzing vacancy:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!vacancyText) {
    return (
      <EmptyState />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <AnalysisHeader 
        analysis={analysis}
        isAnalyzing={isAnalyzing}
        onAnalyze={analyzeVacancy}
      />

      {isAnalyzing && <LoadingState />}
      {analysis && <AnalysisResults analysis={analysis} />}
    </div>
  );
};

/**
 * Empty state component when no vacancy text is provided
 */
const EmptyState: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Анализ вакансии</h3>
    <p className="text-gray-600">Вставьте текст вакансии для анализа требований</p>
  </div>
);

/**
 * Analysis header with title and analyze button
 */
interface AnalysisHeaderProps {
  analysis: VacancyAnalysis | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({ 
  analysis, 
  isAnalyzing, 
  onAnalyze 
}) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center space-x-3">
      <Target className="h-6 w-6 text-purple-600" />
      <h2 className="text-xl font-semibold text-gray-900">Анализ вакансии</h2>
    </div>
    
    {!analysis && (
      <button
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
        type="button"
      >
        <Sparkles className="h-4 w-4" />
        <span>{isAnalyzing ? 'Анализирую...' : 'Анализировать'}</span>
      </button>
    )}
  </div>
);

/**
 * Loading state during analysis
 */
const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center space-x-3 p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
    <div className="text-center">
      <p className="text-gray-600 mb-2">Анализирую требования вакансии...</p>
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <Clock className="h-4 w-4" />
        <span>Это займет несколько секунд</span>
      </div>
    </div>
  </div>
);

/**
 * Analysis results display component
 */
interface AnalysisResultsProps {
  analysis: VacancyAnalysis;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => (
  <div className="space-y-6">
    <MatchScore score={analysis.matchScore} />
    <KeyRequirements requirements={analysis.keyRequirements} />
    <SkillsAnalysis 
      requiredSkills={analysis.requiredSkills}
      optionalSkills={analysis.optionalSkills}
    />
    <JobDetails analysis={analysis} />
    <Recommendations recommendations={analysis.recommendations} />
  </div>
);

/**
 * Match score display component
 */
interface MatchScoreProps {
  score: number;
}

const MatchScore: React.FC<MatchScoreProps> = ({ score }) => (
  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-700">Соответствие профилю</span>
      <div className="flex items-center space-x-2">
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-lg font-bold text-green-600">{score}%</span>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <CheckCircle className="h-5 w-5 text-green-600" />
      <span className="text-sm text-green-700">Высокое соответствие требованиям</span>
    </div>
  </div>
);

/**
 * Key requirements list component
 */
interface KeyRequirementsProps {
  requirements: string[];
}

const KeyRequirements: React.FC<KeyRequirementsProps> = ({ requirements }) => (
  <div>
    <h3 className="font-semibold text-gray-900 mb-3">Ключевые требования</h3>
    <div className="space-y-2">
      {requirements.map((req, idx) => (
        <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-700">{req}</span>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Skills analysis component
 */
interface SkillsAnalysisProps {
  requiredSkills: string[];
  optionalSkills: string[];
}

const SkillsAnalysis: React.FC<SkillsAnalysisProps> = ({ requiredSkills, optionalSkills }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Обязательные навыки</h3>
      <div className="space-y-2">
        {requiredSkills.map((skill, idx) => (
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
        {optionalSkills.map((skill, idx) => (
          <div key={idx} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Job details component
 */
interface JobDetailsProps {
  analysis: VacancyAnalysis;
}

const JobDetails: React.FC<JobDetailsProps> = ({ analysis }) => (
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
);

/**
 * Recommendations component
 */
interface RecommendationsProps {
  recommendations: string[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => (
  <div>
    <h3 className="font-semibold text-gray-900 mb-3">Рекомендации для адаптации резюме</h3>
    <div className="space-y-2">
      {recommendations.map((rec, idx) => (
        <div key={idx} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <Sparkles className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-yellow-800">{rec}</span>
        </div>
      ))}
    </div>
  </div>
);

export default VacancyAnalyzer;