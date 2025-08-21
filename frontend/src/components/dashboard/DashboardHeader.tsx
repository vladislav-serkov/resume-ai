import React from 'react';
import { Sparkles, Briefcase, LogOut } from 'lucide-react';
import NotificationCenter from '../NotificationCenter';
import { User as UserType, VoidFunction } from '../../types';
import { DASHBOARD_TABS } from '../../constants';

interface DashboardHeaderProps {
  user: UserType;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: VoidFunction;
}

/**
 * Dashboard header with simplified navigation (only applications)
 */
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  activeTab,
  onTabChange,
  onLogout
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartCareer
              </h1>
            </div>
            
            {/* Navigation - simplified to just show we're on applications */}
            <nav className="hidden md:flex space-x-8">
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-700">
                <Briefcase className="h-4 w-4" />
                <span>Мои отклики и статистика</span>
              </div>
            </nav>
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            <NotificationCenter user={user} />
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{user.position}</p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.avatar}
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
              title="Выйти"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;