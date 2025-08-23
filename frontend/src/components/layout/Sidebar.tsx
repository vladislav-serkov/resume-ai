import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  FileText, 
  TrendingUp, 
  CreditCard, 
  User, 
  Settings,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  user: {
    name: string;
    avatar: string;
  };
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();

  const navigationItems: NavItem[] = [
    {
      id: 'responses',
      label: 'Отклики',
      icon: FileText,
      path: '/dashboard/responses'
    },
    {
      id: 'statistics',
      label: 'Статистика',
      icon: TrendingUp,
      path: '/dashboard/statistics'
    },
    {
      id: 'pricing',
      label: 'Тарифы',
      icon: CreditCard,
      path: '/dashboard/pricing'
    },
    {
      id: 'profile',
      label: 'Профиль',
      icon: User,
      path: '/dashboard/profile'
    },
    {
      id: 'settings',
      label: 'Настройки',
      icon: Settings,
      path: '/dashboard/settings'
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SmartCareer
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className={`h-4 w-4 opacity-0 group-hover:opacity-50 transition-opacity ${
                isActive ? 'opacity-100 text-blue-500' : ''
              }`} />
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
            {user.avatar}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500">Пользователь</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;