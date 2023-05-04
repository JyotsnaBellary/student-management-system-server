import { Router } from 'express';
import invigilationController  from '../controllers/invigilation.controller'
const authMiddleLayer = require('../middleware/isAuth')
const router = Router();


router.post('/invigilation', authMiddleLayer, invigilationController.addInvigilation);
// router.get('/invigilation/:userId', invigilationController.getInvigilationDetails);
router.get('/invigilation/:userId', authMiddleLayer, invigilationController.getInvigilationDetails);
router.put('/invigilation/:id', authMiddleLayer, invigilationController.updateInvigilationDetails);

export default router;
