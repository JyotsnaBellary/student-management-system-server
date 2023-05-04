import { Router } from "express";
import attendanceController from "../controllers/attendance.controller";

const authMiddleLayer = require('../middleware/isAuth')
const router = Router();

router.post('/attendance', authMiddleLayer, attendanceController.postAttendance);
router.get('/attendance/:Class/:section', authMiddleLayer, attendanceController.getAttendance);
router.get('/attendance/', authMiddleLayer, attendanceController.getAttendance);
router.put('/attendance', authMiddleLayer, attendanceController.updateAttendance);

export default router;
