import { Router } from 'express';
import { AIController } from '../controllers/aiController';

const router = Router();

// Analyze vacancy text with AI
router.post('/analyze-vacancy', AIController.analyzeVacancy);

// Get analysis history for current user
router.get('/analysis-history', AIController.getAnalysisHistory);

// Delete specific analysis
router.delete('/analysis/:id', AIController.deleteAnalysis);

// Generate resume adaptation based on analysis
router.post('/adapt-resume', AIController.generateResumeAdaptation);

export default router;