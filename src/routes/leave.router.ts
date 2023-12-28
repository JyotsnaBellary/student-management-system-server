import { Router } from "express";
import leaveController from "../controllers/leave.controller";

const authMiddleLayer = require('../middleware/isAuth')
const router = Router();

router.post('/leave', leaveController.postLeave);
router.get('/leaves/:Class/:section', authMiddleLayer, leaveController.getStudentLeaves);
// router.get('/leaves/:userId',  leaveController.getTheStudentLeaves);
router.get('/leaves', leaveController.getTheStudentLeaves);
router.put('/approveLeave', leaveController.ApproveLeave)
// router.post('/borrowBook', authMiddleLayer, leaveController.borrowBook);

export default router;
