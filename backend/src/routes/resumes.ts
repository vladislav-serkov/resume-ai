import { Router } from 'express';
import { ResumeController } from '../controllers/resumeController';

const router = Router();

router.get('/', ResumeController.getResumes);
router.post('/', ResumeController.createResume);
router.put('/:id', ResumeController.updateResume);
router.delete('/:id', ResumeController.deleteResume);

// File operations
router.post('/upload', ResumeController.uploadResume);
router.get('/:id/download', ResumeController.downloadResume);
router.get('/:id/preview', ResumeController.previewResume);

export default router;