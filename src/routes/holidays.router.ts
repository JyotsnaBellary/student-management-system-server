import { Router } from 'express';
import  authController  from '../controllers/auth';
import holidayController from '../controllers/holidays';
import { body } from 'express-validator';
// import { isAuthMiddle } from '../middleware/isAuth';
const authMiddleLayer = require('../middleware/isAuth')
const router = Router();

router.post('/holiday', authMiddleLayer, holidayController.addHoliday)
//   router.post('/holiday', holidayController.addHoliday)

// http://localhost:8080/holidays
router.get('/holidays', authMiddleLayer, holidayController.getHolidays)

router.put('/holiday/:holidayId');

router.delete('/holiday/:holidayId');

export default router;

