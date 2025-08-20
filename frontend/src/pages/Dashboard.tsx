import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardProps, SearchFilters } from '../types';
import { DASHBOARD_TABS } from '../constants';
import { mockVacancies } from '../data/mockVacancies';
import { mockDashboardStats, mockApplications } from '../data/mockStats';

// Dashboard components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AIStatusCard from '../components/dashboard/AIStatusCard';
import SearchFilters as SearchFiltersComponent from '../components/dashboard/SearchFilters';
import VacancyCard from '../components/dashboard/VacancyCard';
import ApplicationsList from '../components/dashboard/ApplicationsList';

/**
 * Main dashboard page component
 */
const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  
  // State management
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<SearchFilters>({
    location: '',
    salary: '',
    experience: '',
    remote: false
  });
  const [activeTab, setActiveTab] = useState<string>(DASHBOARD_TABS.SEARCH);

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
        <AIStatusCard stats={mockDashboardStats} />

        {activeTab === DASHBOARD_TABS.SEARCH && (
          <SearchTabContent
            searchQuery={searchQuery}
            filters={selectedFilters}
            onSearchChange={setSearchQuery}
            onFiltersChange={setSelectedFilters}
            onApply={handleApply}
          />
        )}

        {activeTab === DASHBOARD_TABS.APPLICATIONS && (
          <ApplicationsList applications={mockApplications} />
        )}
      </main>
    </div>
  );
};

/**
 * Search tab content component
 */
interface SearchTabContentProps {
  searchQuery: string;
  filters: SearchFilters;
  onSearchChange: (query: string) => void;
  onFiltersChange: (filters: SearchFilters) => void;
  onApply: (vacancyId: number) => void;
}

const SearchTabContent: React.FC<SearchTabContentProps> = ({
  searchQuery,
  filters,
  onSearchChange,
  onFiltersChange,
  onApply
}) => (
  <>
    <SearchFiltersComponent
      searchQuery={searchQuery}
      filters={filters}
      onSearchChange={onSearchChange}
      onFiltersChange={onFiltersChange}
    />

    <VacanciesList vacancies={mockVacancies} onApply={onApply} />
  </>
);

/**
 * Vacancies list component
 */
interface VacanciesListProps {
  vacancies: typeof mockVacancies;
  onApply: (vacancyId: number) => void;
}

const VacanciesList: React.FC<VacanciesListProps> = ({ vacancies, onApply }) => (
  <div className="space-y-6">
    {vacancies.map((vacancy) => (
      <VacancyCard
        key={vacancy.id}
        vacancy={vacancy}
        onApply={onApply}
      />
    ))}
  </div>
);

export default Dashboard;