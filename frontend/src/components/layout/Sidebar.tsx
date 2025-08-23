import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  FileText, 
  TrendingUp, 
  CreditCard, 
  User, 
  Settings,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  onLogout: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const location = useLocation();

  const navigationGroups: NavGroup[] = [
    {
      title: 'Навигация',
      items: [
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
        }
      ]
    },
    {
      title: 'Профиль и настройки',
      items: [
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
      ]
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
      <nav className="flex-1 px-4 overflow-y-auto">
        {navigationGroups.map((group, groupIndex) => (
          <div key={group.title} className={groupIndex > 0 ? 'mt-6' : 'mt-0'}>
            {/* Group title */}
            <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {group.title}
            </h3>
            
            {/* Group items */}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 opacity-0 group-hover:opacity-50 transition-opacity ${
                      isActive ? 'opacity-100 text-blue-500' : ''
                    }`} />
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Notifications and User section */}
      <div className="flex-shrink-0">
        {/* Notifications */}
        <div className="px-4 py-2 border-t border-gray-200">
          <NotificationCenter user={user} />
        </div>
        
        {/* User info and logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                {user.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors hover:bg-gray-100"
              title="Выйти"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;