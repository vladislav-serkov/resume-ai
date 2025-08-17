import { Router } from 'express';
import { ResumeController } from '../controllers/resumeController';

const router = Router();

router.get('/', ResumeController.getResumes);
router.post('/', ResumeController.createResume);
router.put('/:id', ResumeController.updateResume);
router.delete('/:id', ResumeController.deleteResume);

export default router;