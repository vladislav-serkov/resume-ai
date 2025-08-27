import React, { useState, useEffect, useRef } from 'react';
import { Bot, Play, Pause, Settings } from 'lucide-react';
import { DashboardStats, AIStatus } from '../../types';
import { aiService, StartProcessingRequest } from '../../services/aiService';

interface AIStatusCardProps {
  stats: DashboardStats;
}

/**
 * AI assistant status card showing activity and statistics
 */
const AIStatusCard: React.FC<AIStatusCardProps> = ({ stats }) => {
  const [aiStatus, setAiStatus] = useState<AIStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxApplications, setMaxApplications] = useState(5);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Load AI status and setup SSE on component mount
  useEffect(() => {
    loadAIStatus();
    setupSSE();
    
    return () => {
      // Cleanup SSE connection on unmount
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const loadAIStatus = async () => {
    try {
      const status = await aiService.getAIStatus();
      setAiStatus(status);
      setSearchQuery(status.search_query || '');
      setMaxApplications(status.max_applications_per_run);
    } catch (error) {
      console.error('Ошибка загрузки статуса AI:', error);
    }
  };

  const setupSSE = () => {
    try {
      const eventSource = aiService.createEventSource();
      eventSourceRef.current = eventSource;
      
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('SSE event received:', data);
      };
      
      eventSource.addEventListener('status_update', (event: any) => {
        const data = JSON.parse(event.data);
        if (aiStatus) {
          setAiStatus({ ...aiStatus, is_active: data.is_active });
        }
      });
      
      eventSource.addEventListener('processing_update', (event: any) => {
        const data = JSON.parse(event.data);
        if (aiStatus) {
          setAiStatus({ ...aiStatus, processed_today: data.total_today });
        }
      });
      
      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        eventSource.close();
        // Retry connection after 5 seconds
        setTimeout(setupSSE, 5000);
      };
      
    } catch (error) {
      console.error('Failed to setup SSE:', error);
    }
  };

  const toggleAIStatus = async () => {
    if (!aiStatus || isLoading) return;
    
    setIsLoading(true);
    try {
      if (aiStatus.is_active) {
        // Stop processing
        const newStatus = await aiService.stopProcessing();
        setAiStatus(newStatus);
      } else {
        // Start processing - show settings first if no search query
        if (!searchQuery.trim()) {
          setShowSettings(true);
          setIsLoading(false);
          return;
        }
        
        const request: StartProcessingRequest = {
          searchQuery: searchQuery,
          maxApplicationsPerRun: maxApplications
        };
        
        const newStatus = await aiService.startProcessing(request);
        setAiStatus(newStatus);
      }
    } catch (error) {
      console.error('Ошибка изменения статуса AI:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartWithSettings = async () => {
    if (!searchQuery.trim()) {
      alert('Пожалуйста, укажите поисковый запрос');
      return;
    }
    
    setIsLoading(true);
    try {
      const request: StartProcessingRequest = {
        searchQuery: searchQuery,
        maxApplicationsPerRun: maxApplications
      };
      
      const newStatus = await aiService.startProcessing(request);
      setAiStatus(newStatus);
      setShowSettings(false);
    } catch (error) {
      console.error('Ошибка запуска AI:', error);
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
      label: 'Сегодня обработано',
      value: aiStatus?.processed_today ?? 0
    }
  ];

  const isActive = aiStatus?.is_active ?? false;
  const statusText = isActive ? 'активен' : 'остановлен';
  const statusDescription = isActive 
    ? 'Мониторинг новых вакансий • Автоотклик включен'
    : 'Мониторинг приостановлен • Автоотклик выключен';

  return (
    <>
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
              {aiStatus?.search_query && (
                <p className={`text-xs ${isActive ? 'text-blue-200' : 'text-gray-300'}`}>
                  Запрос: "{aiStatus.search_query}"
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold">{aiStatus?.processed_today ?? 0}</div>
              <div className={`text-sm ${isActive ? 'text-blue-100' : 'text-gray-200'}`}>
                автооткликов сегодня
              </div>
            </div>
            
            {/* Settings Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Settings className="h-4 w-4" />
            </button>
            
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

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Настройки AI-ассистента
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Поисковый запрос
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Frontend разработчик"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Максимум откликов за раз
                </label>
                <select
                  value={maxApplications}
                  onChange={(e) => setMaxApplications(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={1}>1</option>
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleStartWithSettings}
                disabled={isLoading || !searchQuery.trim()}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Запуск...' : 'Запустить'}
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIStatusCard;