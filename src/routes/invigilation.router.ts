import { Router } from 'express';
import invigilationController  from '../controllers/invigilation'
const authMiddleLayer = require('../middleware/isAuth')
const router = Router();


router.post('/invigilation', authMiddleLayer, invigilationController.addInvigilation);
router.get('/examinations/:userId', authMiddleLayer, invigilationController.getInvigilationDetails);
router.put('/invigilation/:id', authMiddleLayer, invigilationController.updateInvigilationDetails);

export default router;
