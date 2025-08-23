import React from 'react';
import AIStatusCard from '../components/dashboard/AIStatusCard';
import ApplicationsList from '../components/dashboard/ApplicationsList';
import { mockDashboardStats, mockApplications } from '../data/mockStats';

/**
 * Страница откликов - отображает список всех откликов пользователя
 */
const ResponsesPage: React.FC = () => {
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
      <AIStatusCard stats={mockDashboardStats} />

      {/* Applications List */}
      <ApplicationsList applications={mockApplications} />
    </div>
  );
};

export default ResponsesPage;