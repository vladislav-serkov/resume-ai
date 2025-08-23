import React from 'react';
import StatisticsPageComponent from '../components/dashboard/StatisticsPage';
import { mockDashboardStats } from '../data/mockStats';

/**
 * Страница статистики - отображает аналитику по откликам и эффективности поиска
 */
const StatisticsPage: React.FC = () => {
  const stats = {
    totalApplications: mockDashboardStats.totalApplications,
    aiAdaptations: mockDashboardStats.aiAdaptations,
    responses: mockDashboardStats.responses,
    interviews: mockDashboardStats.interviews,
    successRate: Math.round((mockDashboardStats.responses / mockDashboardStats.totalApplications) * 100)
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Статистика</h1>
        <p className="text-gray-600 mt-1">
          Аналитика эффективности вашего поиска работы
        </p>
      </div>

      {/* Statistics Component */}
      <StatisticsPageComponent stats={stats} />
    </div>
  );
};

export default StatisticsPage;