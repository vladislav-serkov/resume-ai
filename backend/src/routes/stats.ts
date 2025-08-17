import { Router } from 'express';
import { StatsController } from '../controllers/statsController';

const router = Router();

router.get('/', StatsController.getUserStats);

export default router;