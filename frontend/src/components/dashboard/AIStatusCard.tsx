import React, { useState, useEffect } from 'react';
import { Bot, Play, Pause } from 'lucide-react';
import { DashboardStats, AIStatus } from '../../types';
import { aiService } from '../../services/aiService';

interface AIStatusCardProps {
  stats: DashboardStats;
}

/**
 * AI assistant status card showing activity and statistics
 */
const AIStatusCard: React.FC<AIStatusCardProps> = ({ stats }) => {
  const [aiStatus, setAiStatus] = useState<AIStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load AI status on component mount
  useEffect(() => {
    loadAIStatus();
  }, []);

  const loadAIStatus = async () => {
    try {
      const status = await aiService.getAIStatus();
      setAiStatus(status);
    } catch (error) {
      console.error('Ошибка загрузки статуса AI:', error);
    }
  };

  const toggleAIStatus = async () => {
    if (!aiStatus || isLoading) return;
    
    setIsLoading(true);
    try {
      const newStatus = await aiService.updateAIStatus(!aiStatus.is_active);
      setAiStatus(newStatus);
    } catch (error) {
      console.error('Ошибка изменения статуса AI:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statisticsItems = [
    {
      label: 'Всего откликов',
      value: stats.totalApplications
    },
    {
      label: 'Ответов',
      value: stats.responses
    },
    {
      label: 'Собеседований',
      value: stats.interviews
    },
    {
      label: 'AI-адаптаций',
      value: stats.aiAdaptations
    }
  ];

  const isActive = aiStatus?.is_active ?? true;
  const statusText = isActive ? 'активен' : 'остановлен';
  const statusDescription = isActive 
    ? 'Мониторинг новых вакансий • Автоотклик включен'
    : 'Мониторинг приостановлен • Автоотклик выключен';

  return (
    <div className={`mb-8 rounded-2xl p-6 text-white ${
      isActive 
        ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
        : 'bg-gradient-to-r from-gray-500 to-gray-600'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">AI-Ассистент {statusText}</h3>
            <p className={isActive ? 'text-blue-100' : 'text-gray-200'}>{statusDescription}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold">{stats.autoResponses}</div>
            <div className={`text-sm ${isActive ? 'text-blue-100' : 'text-gray-200'}`}>
              автооткликов сегодня
            </div>
          </div>
          
          {/* Start/Stop Button */}
          <button
            onClick={toggleAIStatus}
            disabled={isLoading}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all
              ${isActive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isActive ? 'Stop' : 'Start'}</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-4 gap-6">
        {statisticsItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-xl font-bold">{item.value}</div>
            <div className={`text-sm ${isActive ? 'text-blue-100' : 'text-gray-200'}`}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIStatusCard;