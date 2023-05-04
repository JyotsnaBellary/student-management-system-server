"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leave_controller_1 = __importDefault(require("../controllers/leave.controller"));
const authMiddleLayer = require('../middleware/isAuth');
const router = (0, express_1.Router)();
router.post('/leave', leave_controller_1.default.postLeave);
router.get('/leaves/:Class/:section', authMiddleLayer, leave_controller_1.default.getStudentLeaves);
// router.get('/leaves/:userId',  leaveController.getTheStudentLeaves);
router.get('/leaves', leave_controller_1.default.getTheStudentLeaves);
router.put('/approveLeave', leave_controller_1.default.ApproveLeave);
// router.post('/borrowBook', authMiddleLayer, leaveController.borrowBook);
exports.default = router;
