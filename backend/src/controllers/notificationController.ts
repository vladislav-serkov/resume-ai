import { Request, Response } from 'express';
import { ApiResponse, Notification } from '../types';

export class NotificationController {
  static async getNotifications(_req: Request, res: Response<ApiResponse<Notification[]>>) {
    try {
      // Mock notification data
      const mockNotifications: Notification[] = [
        {
          id: '1',
          userId: '1',
          type: 'job_match',
          title: 'Новая подходящая вакансия',
          message: 'Senior Frontend Developer в Яндекс - 92% соответствие',
          timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 минут назад
          read: false,
          icon: 'Briefcase',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          action: 'Посмотреть вакансию'
        },
        {
          id: '2',
          userId: '1',
          type: 'application_sent',
          title: 'Отклик отправлен',
          message: 'Ваше адаптированное резюме отправлено в React компанию',
          timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 минут назад
          read: false,
          icon: 'CheckCircle',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          action: 'Отследить статус'
        },
        {
          id: '3',
          userId: '1',
          type: 'response_received',
          title: 'Ответ от работодателя!',
          message: 'Авито хочет назначить собеседование',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 часа назад
          read: true,
          icon: 'MessageSquare',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          action: 'Ответить',
          priority: 'high'
        },
        {
          id: '4',
          userId: '1',
          type: 'interview_reminder',
          title: 'Напоминание о собеседовании',
          message: 'Собеседование с Сбер завтра в 14:00',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 часа назад
          read: true,
          icon: 'Calendar',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          action: 'Подготовиться'
        },
        {
          id: '5',
          userId: '1',
          type: 'stats_update',
          title: 'Еженедельная статистика',
          message: 'За неделю: 12 откликов, 3 ответа, 2 собеседования',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 день назад
          read: true,
          icon: 'TrendingUp',
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-50',
          borderColor: 'border-indigo-200',
          action: 'Подробная статистика'
        },
        {
          id: '6',
          userId: '1',
          type: 'profile_incomplete',
          title: 'Профиль не заполнен',
          message: 'Добавьте навыки для лучшего поиска вакансий',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 дня назад
          read: true,
          icon: 'User',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          action: 'Заполнить профиль'
        }
      ];

      const response: ApiResponse<Notification[]> = {
        success: true,
        data: mockNotifications,
        message: 'Notifications retrieved successfully'
      };

      return res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get notifications'
      };
      return res.status(500).json(response);
    }
  }

  static async markAsRead(req: Request<{ id: string }>, res: Response<ApiResponse>) {
    try {
      const { id } = req.params;

      const response: ApiResponse = {
        success: true,
        message: `Notification ${id} marked as read`
      };

      return res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to mark notification as read'
      };
      return res.status(400).json(response);
    }
  }

  static async markAllAsRead(_req: Request, res: Response<ApiResponse>) {
    try {
      const response: ApiResponse = {
        success: true,
        message: 'All notifications marked as read'
      };

      return res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to mark all notifications as read'
      };
      return res.status(400).json(response);
    }
  }

  static async deleteNotification(req: Request<{ id: string }>, res: Response<ApiResponse>) {
    try {
      const { id } = req.params;

      const response: ApiResponse = {
        success: true,
        message: `Notification ${id} deleted successfully`
      };

      return res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete notification'
      };
      return res.status(400).json(response);
    }
  }

  static async bulkMarkAsRead(req: Request, res: Response<ApiResponse<{ updatedCount: number }>>) {
    try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({
          success: false,
          error: 'IDs массив обязателен'
        });
      }

      // Mock bulk mark as read operation
      const updatedCount = ids.length;

      const response: ApiResponse<{ updatedCount: number }> = {
        success: true,
        data: { updatedCount },
        message: `${updatedCount} уведомлений отмечено как прочитанные`
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Ошибка при массовом отмечании уведомлений как прочитанные'
      });
    }
  }

  static async bulkDelete(req: Request, res: Response<ApiResponse<{ deletedCount: number }>>) {
    try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({
          success: false,
          error: 'IDs массив обязателен'
        });
      }

      // Mock bulk delete operation
      const deletedCount = ids.length;

      const response: ApiResponse<{ deletedCount: number }> = {
        success: true,
        data: { deletedCount },
        message: `${deletedCount} уведомлений удалено`
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Ошибка при массовом удалении уведомлений'
      });
    }
  }

  static async deleteAllRead(_req: Request, res: Response<ApiResponse<{ deletedCount: number }>>) {
    try {
      // Mock delete all read notifications
      const deletedCount = 4; // Mock number of read notifications

      const response: ApiResponse<{ deletedCount: number }> = {
        success: true,
        data: { deletedCount },
        message: `${deletedCount} прочитанных уведомлений удалено`
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Ошибка при удалении прочитанных уведомлений'
      });
    }
  }

  static async getUnreadCount(_req: Request, res: Response<ApiResponse<{ count: number }>>) {
    try {
      // Mock unread count
      const unreadCount = 2; // Based on mock data

      const response: ApiResponse<{ count: number }> = {
        success: true,
        data: { count: unreadCount },
        message: 'Количество непрочитанных уведомлений получено'
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Ошибка при получении количества непрочитанных уведомлений'
      });
    }
  }

  static async getNotificationsByType(req: Request, res: Response<ApiResponse<Notification[]>>) {
    try {
      const { type } = req.params;
      const { limit, offset } = req.query;

      // Mock filtered notifications by type
      const allNotifications: Notification[] = [
        {
          id: '1',
          userId: '1',
          type: 'job_match',
          title: 'Новая подходящая вакансия',
          message: 'Senior Frontend Developer в Яндекс - 92% соответствие',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          read: false,
          icon: 'Briefcase',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          action: 'Посмотреть вакансию'
        },
        {
          id: '2',
          userId: '1',
          type: 'application_sent',
          title: 'Отклик отправлен',
          message: 'Ваше адаптированное резюме отправлено в React компанию',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          read: false,
          icon: 'CheckCircle',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          action: 'Отследить статус'
        }
      ];

      const filteredNotifications = type === 'all' 
        ? allNotifications 
        : allNotifications.filter(n => n.type === type);

      // Apply pagination
      const startIndex = parseInt(offset as string || '0');
      const limitNum = parseInt(limit as string || '10');
      const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + limitNum);

      const response: ApiResponse<Notification[]> = {
        success: true,
        data: paginatedNotifications,
        message: 'Уведомления по типу получены',
        meta: {
          total: filteredNotifications.length,
          count: paginatedNotifications.length,
          offset: startIndex,
          limit: limitNum,
          hasMore: startIndex + limitNum < filteredNotifications.length
        }
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Ошибка при получении уведомлений по типу'
      });
    }
  }
}