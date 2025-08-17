import { Router } from 'express';
import { VacancyController } from '../controllers/vacancyController';

const router = Router();

router.get('/', VacancyController.getVacancies);
router.get('/:id', VacancyController.getVacancy);

export default router;