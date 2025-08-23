import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { User } from '../../types';

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout }) => {
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar user={user} onLogout={onLogout} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Page content - no top bar */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8 h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;