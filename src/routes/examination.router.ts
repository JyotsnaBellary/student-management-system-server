import { Router } from 'express';
import examinationController  from '../controllers/examination.controller'
const authMiddleLayer = require('../middleware/isAuth')
const router = Router();

// router.post('/examinations', authMiddleLayer, examinationController.addExamination);
// router.get('/examinations/:Class', examinationController.getExaminationDetails);
router.get('/examinations/', authMiddleLayer, examinationController.getExaminationDetails);
// router.put('/examinations/:id', authMiddleLayer, examinationController.updateExaminationDetails);

export default router;