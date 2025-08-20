import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Target, Eye, Zap } from 'lucide-react';
import { Vacancy } from '../../types';
import { getMatchScoreColor } from '../../utils/matchScore';

interface VacancyCardProps {
  vacancy: Vacancy;
  onApply: (vacancyId: number) => void;
}

/**
 * Individual vacancy card component
 */
const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy, onApply }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/vacancy/${vacancy.id}`);
  };

  const handleApply = () => {
    onApply(vacancy.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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
                
                <VacancyMetadata vacancy={vacancy} />
              </div>
              
              <MatchScoreBadge score={vacancy.aiMatch} />
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{vacancy.description}</p>
      
      <div className="flex items-center justify-between">
        <TagsList tags={vacancy.tags} />
        <ActionButtons 
          onViewDetails={handleViewDetails}
          onApply={handleApply}
        />
      </div>
    </div>
  );
};

/**
 * Vacancy metadata (location, salary, posted time, remote indicator)
 */
interface VacancyMetadataProps {
  vacancy: Vacancy;
}

const VacancyMetadata: React.FC<VacancyMetadataProps> = ({ vacancy }) => (
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
);

/**
 * Match score badge component
 */
interface MatchScoreBadgeProps {
  score: number;
}

const MatchScoreBadge: React.FC<MatchScoreBadgeProps> = ({ score }) => (
  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(score)}`}>
    <div className="flex items-center space-x-1">
      <Target className="h-3 w-3" />
      <span>{score}% соответствие</span>
    </div>
  </div>
);

/**
 * Tags list component
 */
interface TagsListProps {
  tags: string[];
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, index) => (
      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
        {tag}
      </span>
    ))}
  </div>
);

/**
 * Action buttons component
 */
interface ActionButtonsProps {
  onViewDetails: () => void;
  onApply: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onViewDetails, onApply }) => (
  <div className="flex items-center space-x-3">
    <button 
      onClick={onViewDetails}
      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
    >
      <Eye className="h-4 w-4" />
      <span>Подробнее</span>
    </button>
    <button 
      onClick={onApply}
      className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
    >
      <Zap className="h-4 w-4" />
      <span>AI-отклик</span>
    </button>
  </div>
);

export default VacancyCard;