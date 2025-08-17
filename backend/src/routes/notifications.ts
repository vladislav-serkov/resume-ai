import { Router } from 'express';
import { NotificationController } from '../controllers/notificationController';

const router = Router();

// Basic operations
router.get('/', NotificationController.getNotifications);
router.put('/:id/read', NotificationController.markAsRead);
router.delete('/:id', NotificationController.deleteNotification);

// Bulk operations
router.put('/read-all', NotificationController.markAllAsRead);
router.put('/bulk-read', NotificationController.bulkMarkAsRead);
router.delete('/bulk-delete', NotificationController.bulkDelete);
router.delete('/delete-all-read', NotificationController.deleteAllRead);

// Additional operations
router.get('/unread-count', NotificationController.getUnreadCount);
router.get('/type/:type', NotificationController.getNotificationsByType);

export default router;