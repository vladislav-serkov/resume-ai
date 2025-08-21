import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  X, 
  CheckCircle, 
  Briefcase, 
  User, 
  MessageSquare,
  Calendar,
  TrendingUp,
  Trash2,
  Eye,
  Star,
  type LucideIcon
} from 'lucide-react';
import { User as UserType } from '../types';

interface NotificationCenterProps {
  user: UserType;
}

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  action?: string;
  priority?: NotificationPriority;
}

enum NotificationType {
  JOB_MATCH = 'job_match',
  APPLICATION_SENT = 'application_sent',
  RESPONSE_RECEIVED = 'response_received',
  INTERVIEW_REMINDER = 'interview_reminder',
  STATS_UPDATE = 'stats_update',
  PROFILE_INCOMPLETE = 'profile_incomplete'
}

enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: 1,
    type: NotificationType.JOB_MATCH,
    title: 'Новая подходящая вакансия',
    message: 'Senior Frontend Developer в Яндекс - 92% соответствие',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    icon: Briefcase,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    action: 'Посмотреть вакансию'
  },
  {
    id: 2,
    type: NotificationType.APPLICATION_SENT,
    title: 'Отклик отправлен',
    message: 'Ваше адаптированное резюме отправлено в React компанию',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    action: 'Отследить статус'
  },
  {
    id: 3,
    type: NotificationType.RESPONSE_RECEIVED,
    title: 'Ответ от работодателя!',
    message: 'Авито хочет назначить собеседование',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
    icon: MessageSquare,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    action: 'Ответить',
    priority: NotificationPriority.HIGH
  },
  {
    id: 4,
    type: NotificationType.INTERVIEW_REMINDER,
    title: 'Напоминание о собеседовании',
    message: 'Собеседование с Сбер завтра в 14:00',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
    icon: Calendar,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    action: 'Подготовиться'
  },
  {
    id: 5,
    type: NotificationType.STATS_UPDATE,
    title: 'Еженедельная статистика',
    message: 'За неделю: 12 откликов, 3 ответа, 2 собеседования',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    icon: TrendingUp,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    action: 'Подробная статистика'
  },
  {
    id: 6,
    type: NotificationType.PROFILE_INCOMPLETE,
    title: 'Профиль не заполнен',
    message: 'Добавьте навыки для лучшего поиска вакансий',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
    icon: User,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    action: 'Заполнить профиль'
  }
];

/**
 * Notification center component with dropdown and management features
 */
const NotificationCenter: React.FC<NotificationCenterProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    return `${days} дн назад`;
  };

  const getPriorityIcon = (notification: Notification): React.JSX.Element | null => {
    if (notification.priority === NotificationPriority.HIGH) {
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
        type="button"
        aria-label="Открыть уведомления"
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
          <NotificationHeader 
            unreadCount={unreadCount}
            onMarkAllAsRead={markAllAsRead}
            onClose={() => setIsOpen(false)}
          />

          <NotificationsList 
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onDelete={deleteNotification}
            getTimeAgo={getTimeAgo}
            getPriorityIcon={getPriorityIcon}
          />

          {notifications.length > 0 && (
            <NotificationFooter onClose={() => setIsOpen(false)} />
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Notification dropdown header
 */
interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onClose: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  onMarkAllAsRead,
  onClose
}) => (
  <div className="px-6 py-4 border-b border-gray-100">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">Уведомления</h3>
      <div className="flex items-center space-x-2">
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            type="button"
          >
            Прочитать все
          </button>
        )}
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          type="button"
          aria-label="Закрыть"
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
);

/**
 * Notifications list component
 */
interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
  getTimeAgo: (timestamp: Date) => string;
  getPriorityIcon: (notification: Notification) => React.JSX.Element | null;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onMarkAsRead,
  onDelete,
  getTimeAgo,
  getPriorityIcon
}) => (
  <div className="max-h-80 overflow-y-auto">
    {notifications.length === 0 ? (
      <EmptyNotifications />
    ) : (
      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            onDelete={onDelete}
            getTimeAgo={getTimeAgo}
            getPriorityIcon={getPriorityIcon}
          />
        ))}
      </div>
    )}
  </div>
);

/**
 * Empty notifications state
 */
const EmptyNotifications: React.FC = () => (
  <div className="px-6 py-8 text-center">
    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
    <p className="text-gray-500">Нет уведомлений</p>
  </div>
);

/**
 * Individual notification item
 */
interface NotificationItemProps extends NotificationsListProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
  getTimeAgo,
  getPriorityIcon
}) => {
  const IconComponent = notification.icon;
  
  return (
    <div
      className={`relative px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group ${
        !notification.read ? 'bg-blue-50/50' : ''
      }`}
      onClick={() => !notification.read && onMarkAsRead(notification.id)}
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
                    onMarkAsRead(notification.id);
                  }}
                  className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                  title="Отметить как прочитанное"
                  type="button"
                >
                  <Eye className="h-3 w-3" />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notification.id);
                }}
                className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                title="Удалить уведомление"
                type="button"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Unread indicator */}
          {!notification.read && (
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full" />
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Notification dropdown footer
 */
interface NotificationFooterProps {
  onClose: () => void;
}

const NotificationFooter: React.FC<NotificationFooterProps> = ({ onClose }) => (
  <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
    <button 
      className="w-full text-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
      onClick={() => {
        onClose();
        // Navigate to notifications page
      }}
      type="button"
    >
      Посмотреть все уведомления
    </button>
  </div>
);

export default NotificationCenter;