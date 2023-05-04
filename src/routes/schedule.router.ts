import { Router } from "express";
import scheduleController from "../controllers/schedule.controller";

const authMiddleLayer = require('../middleware/isAuth')
const router = Router();

router.post('/schedule', scheduleController.postSchedule);
router.get('/schedule/:Class/:section', authMiddleLayer, scheduleController.getSchedule);
router.get('/schedule/', authMiddleLayer, scheduleController.getSchedule);

export default router;
