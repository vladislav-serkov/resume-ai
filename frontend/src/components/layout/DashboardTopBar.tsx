import React from 'react';
import { LogOut } from 'lucide-react';
import NotificationCenter from '../NotificationCenter';
import { User } from '../../types';

interface DashboardTopBarProps {
  user: User;
  onLogout: () => void;
}

const DashboardTopBar: React.FC<DashboardTopBarProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* Page title will be handled by individual pages */}
        </div>

        {/* Right side - notifications and user menu */}
        <div className="flex items-center space-x-4">
          <NotificationCenter user={user} />
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            
            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors hover:bg-gray-100"
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

export default DashboardTopBar;