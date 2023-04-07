import { Router } from 'express';
import examinationController  from '../controllers/examination'
const authMiddleLayer = require('../middleware/isAuth')
const router = Router();

router.post('/examinations', authMiddleLayer, examinationController.addExamination);
router.get('/examinations/:Class', authMiddleLayer, examinationController.getExaminationDetails);
router.put('/examinations/:id', authMiddleLayer, examinationController.updateExaminationDetails);

export default router;