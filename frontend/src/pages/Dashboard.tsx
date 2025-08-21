import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardProps } from '../types';
import { DASHBOARD_TABS } from '../constants';
import { mockDashboardStats, mockApplications } from '../data/mockStats';

// Dashboard components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AIStatusCard from '../components/dashboard/AIStatusCard';
import ApplicationsList from '../components/dashboard/ApplicationsList';

/**
 * Main dashboard page component - simplified with only applications and statistics
 */
const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  
  // Since we only have applications tab now, set it as default
  const [activeTab, setActiveTab] = useState<string>(DASHBOARD_TABS.APPLICATIONS);

  /**
   * Handle vacancy application
   */
  const handleApply = useCallback((vacancyId: number) => {
    navigate(`/vacancy/${vacancyId}`);
  }, [navigate]);

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
        {/* Statistics section - always visible */}
        <AIStatusCard stats={mockDashboardStats} />

        {/* Applications section - always visible */}
        <ApplicationsList applications={mockApplications} />
      </main>
    </div>
  );
};

export default Dashboard;