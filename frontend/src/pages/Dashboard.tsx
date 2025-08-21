import { useState, useCallback } from 'react';
import { DashboardProps } from '../types';
import { DASHBOARD_TABS } from '../constants';
import { mockDashboardStats, mockApplications } from '../data/mockStats';

// Dashboard components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AIStatusCard from '../components/dashboard/AIStatusCard';
import ApplicationsList from '../components/dashboard/ApplicationsList';
import StatisticsPage from '../components/dashboard/StatisticsPage';

/**
 * Main dashboard page component with applications and statistics tabs
 */
const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  // Default to applications tab
  const [activeTab, setActiveTab] = useState<string>(DASHBOARD_TABS.APPLICATIONS);


  /**
   * Handle tab changes
   */
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        user={user}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* AI Status Card - always visible */}
        <AIStatusCard stats={mockDashboardStats} />

        {/* Tab Content */}
        {activeTab === DASHBOARD_TABS.APPLICATIONS && (
          <ApplicationsList applications={mockApplications} />
        )}

        {activeTab === DASHBOARD_TABS.STATISTICS && (
          <StatisticsPage stats={{
            totalApplications: mockDashboardStats.totalApplications,
            aiAdaptations: mockDashboardStats.aiAdaptations,
            responses: mockDashboardStats.responses,
            interviews: mockDashboardStats.interviews,
            successRate: Math.round((mockDashboardStats.responses / mockDashboardStats.totalApplications) * 100)
          }} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;