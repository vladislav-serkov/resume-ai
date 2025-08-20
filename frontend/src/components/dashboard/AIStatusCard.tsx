import React from 'react';
import { Bot } from 'lucide-react';
import { DashboardStats } from '../../types';

interface AIStatusCardProps {
  stats: DashboardStats;
}

/**
 * AI assistant status card showing activity and statistics
 */
const AIStatusCard: React.FC<AIStatusCardProps> = ({ stats }) => {
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

  return (
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
          <div className="text-2xl font-bold">{stats.autoResponses}</div>
          <div className="text-blue-100 text-sm">автооткликов сегодня</div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-4 gap-6">
        {statisticsItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-xl font-bold">{item.value}</div>
            <div className="text-blue-100 text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIStatusCard;