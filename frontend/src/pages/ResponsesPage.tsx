import React, { useEffect, useState } from 'react';
import AIStatusCard from '../components/dashboard/AIStatusCard';
import ApplicationsList from '../components/dashboard/ApplicationsList';
import { aiService } from '../services/aiService';

/**
 * Страница откликов - отображает список всех откликов пользователя
 */
const ResponsesPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    responses: 0,
    interviews: 3, // mock
    offers: 0,
    aiAdaptations: 0,
    autoResponses: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const response = await aiService.getUserApplications();
      if (response && response.stats) {
        setStats({
          totalApplications: response.stats.total,
          responses: response.stats.viewed, // или другое поле, если нужно
          interviews: 3, // mock
          offers: 0, // если появится на бэке — заменить
          aiAdaptations: 0, // если появится на бэке — заменить
          autoResponses: 0 // если появится на бэке — заменить
        });
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Мои отклики</h1>
        <p className="text-gray-600 mt-1">
          Управление вашими откликами на вакансии и их статусом
        </p>
      </div>

      {/* AI Status Card */}
      <AIStatusCard stats={stats} />

      {/* Applications List */}
      <ApplicationsList />
    </div>
  );
};

export default ResponsesPage;