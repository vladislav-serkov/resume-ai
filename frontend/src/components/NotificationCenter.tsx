import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Briefcase, 
  User, 
  MessageSquare,
  Calendar,
  TrendingUp,
  Settings,
  MoreVertical,
  Trash2,
  Eye,
  Star,
  LucideIcon
} from 'lucide-react';

interface User {
  name: string;
  position: string;
  avatar: string;
}

interface NotificationCenterProps {
  user: User;
}

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  action: string;
  priority?: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Мок данные уведомлений
  const mockNotifications: Notification[] = [
    {
      id: 1,
      type: 'job_match',
      title: 'Новая подходящая вакансия',
      message: 'Senior Frontend Developer в Яндекс - 92% соответствие',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 минут назад
      read: false,
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      action: 'Посмотреть вакансию'
    },
    {
      id: 2,
      type: 'application_sent',
      title: 'Отклик отправлен',
      message: 'Ваше адаптированное резюме отправлено в React компанию',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 минут назад
      read: false,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      action: 'Отследить статус'
    },
    {
      id: 3,
      type: 'response_received',
      title: 'Ответ от работодателя!',
      message: 'Авито хочет назначить собеседование',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 часа назад
      read: true,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      action: 'Ответить',
      priority: 'high'
    },
    {
      id: 4,
      type: 'interview_reminder',
      title: 'Напоминание о собеседовании',
      message: 'Собеседование с Сбер завтра в 14:00',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 часа назад
      read: true,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      action: 'Подготовиться'
    },
    {
      id: 5,
      type: 'stats_update',
      title: 'Еженедельная статистика',
      message: 'За неделю: 12 откликов, 3 ответа, 2 собеседования',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 день назад
      read: true,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      action: 'Подробная статистика'
    },
    {
      id: 6,
      type: 'profile_incomplete',
      title: 'Профиль не заполнен',
      message: 'Добавьте навыки для лучшего поиска вакансий',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 дня назад
      read: true,
      icon: User,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      action: 'Заполнить профиль'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotifications = (): void => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (notificationId: number): void => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = (): void => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId: number): void => {
    setNotifications(prev => {
      const updatedNotifications = prev.filter(n => n.id !== notificationId);
      const unreadInDeleted = prev.find(n => n.id === notificationId && !n.read);
      if (unreadInDeleted) {
        setUnreadCount(current => Math.max(0, current - 1));
      }
      return updatedNotifications;
    });
  };

  const getTimeAgo = (timestamp: Date): string => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    return `${days} дн назад`;
  };

  const getPriorityIcon = (notification) => {
    if (notification.priority === 'high') {
      return <Star className="h-3 w-3 text-red-500 fill-current" />;
    }
    return null;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={toggleNotifications}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[32rem] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Уведомления</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Прочитать все
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                У вас {unreadCount} непрочитанных уведомлений
              </p>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Нет уведомлений</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`relative px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-10 h-10 ${notification.bgColor} ${notification.borderColor} border rounded-xl flex items-center justify-center`}>
                          <IconComponent className={`h-5 w-5 ${notification.color}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <p className={`text-sm font-medium text-gray-900 ${!notification.read ? 'font-semibold' : ''}`}>
                                  {notification.title}
                                </p>
                                {getPriorityIcon(notification)}
                              </div>
                              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-gray-500">
                                  {getTimeAgo(notification.timestamp)}
                                </p>
                                {notification.action && (
                                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                    {notification.action}
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              {!notification.read && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                                  title="Отметить как прочитанное"
                                >
                                  <Eye className="h-3 w-3" />
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                                title="Удалить уведомление"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>

                          {/* Unread indicator */}
                          {!notification.read && (
                            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
              <button 
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to notifications page
                }}
              >
                Посмотреть все уведомления
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;