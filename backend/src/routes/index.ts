import { Router } from 'express';
import authRoutes from './auth';
import profileRoutes from './profile';
import resumeRoutes from './resumes';
import vacancyRoutes from './vacancies';
import applicationRoutes from './applications';
import notificationRoutes from './notifications';
import statsRoutes from './stats';

const router = Router();

// Health check route
router.get('/', (_req, res) => {
  res.json({ 
    success: true, 
    message: 'SmartCareer API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/resumes', resumeRoutes);
router.use('/vacancies', vacancyRoutes);
router.use('/applications', applicationRoutes);
router.use('/notifications', notificationRoutes);
router.use('/stats', statsRoutes);

export default router;