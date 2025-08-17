import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../services/api';
import { useApiData, useApiCall } from '../hooks/useApi';
import LoadingSpinner from './LoadingSpinner';
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
  Star
} from 'lucide-react';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // API hooks for notifications
  const { 
    data: notificationsData, 
    loading: notificationsLoading, 
    error: notificationsError,
    refetch: refetchNotifications 
  } = useApiData(() => apiService.notifications.getAll(), [], {
    showErrorToast: false
  });

  const { 
    data: unreadCountData, 
    refetch: refetchUnreadCount 
  } = useApiData(() => apiService.notifications.getUnreadCount(), [], {
    showErrorToast: false
  });

  // Auto-refresh notification count every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetchUnreadCount]);

  // Refresh notifications when window regains focus
  useEffect(() => {
    const handleFocus = () => {
      refetchUnreadCount();
      refetchNotifications();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchUnreadCount, refetchNotifications]);

  // API calls for actions
  const { execute: markAsRead } = useApiCall(
    (id) => apiService.notifications.markAsRead(id),
    {
      successMessage: 'Уведомление отмечено как прочитанное',
      onSuccess: () => {
        refetchNotifications();
        refetchUnreadCount();
      }
    }
  );

  const { execute: markAllAsRead } = useApiCall(
    () => apiService.notifications.markAllAsRead(),
    {
      successMessage: 'Все уведомления отмечены как прочитанные',
      onSuccess: () => {
        refetchNotifications();
        refetchUnreadCount();
      }
    }
  );

  const { execute: deleteNotification } = useApiCall(
    (id) => apiService.notifications.delete(id),
    {
      successMessage: 'Уведомление удалено',
      onSuccess: () => {
        refetchNotifications();
        refetchUnreadCount();
      }
    }
  );

  // Get data from API
  const notifications = notificationsData?.data || [];
  const unreadCount = unreadCountData?.data?.count || 0;

  // Map notification types to icons and colors
  const getNotificationIcon = (type) => {
    const iconMap = {
      job_match: Briefcase,
      application_sent: CheckCircle,
      response_received: MessageSquare,
      interview_reminder: Calendar,
      stats_update: TrendingUp,
      profile_incomplete: User
    };
    return iconMap[type] || Info;
  };

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

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  // Handlers for notification actions
  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleDeleteNotification = async (notificationId) => {
    await deleteNotification(notificationId);
  };

  const getTimeAgo = (timestamp) => {
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
                    onClick={handleMarkAllAsRead}
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
            {notificationsLoading ? (
              <div className="px-6 py-8 text-center">
                <LoadingSpinner />
              </div>
            ) : notificationsError ? (
              <div className="px-6 py-8 text-center">
                <p className="text-red-600 mb-4">Ошибка загрузки уведомлений</p>
                <button 
                  onClick={refetchNotifications}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Попробовать снова
                </button>
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Нет уведомлений</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`relative px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-10 h-10 ${notification.bgColor || 'bg-gray-50'} ${notification.borderColor || 'border-gray-200'} border rounded-xl flex items-center justify-center`}>
                          <IconComponent className={`h-5 w-5 ${notification.color || 'text-gray-600'}`} />
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
                                    handleMarkAsRead(notification.id);
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
                                  handleDeleteNotification(notification.id);
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