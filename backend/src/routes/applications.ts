import { Router } from 'express';
import { ApplicationController } from '../controllers/applicationController';

const router = Router();

// Application CRUD operations
router.get('/', ApplicationController.getApplications);
router.post('/', ApplicationController.createApplication);
router.get('/stats', ApplicationController.getApplicationStats);
router.get('/:id', ApplicationController.getApplication);
router.put('/:id/status', ApplicationController.updateApplicationStatus);
router.delete('/:id', ApplicationController.deleteApplication);

export default router;