import { Router } from 'express';
import { ApplicationController } from '../controllers/applicationController';

const router = Router();

router.get('/', ApplicationController.getApplications);
router.post('/', ApplicationController.createApplication);
router.get('/:id', ApplicationController.getApplication);

export default router;