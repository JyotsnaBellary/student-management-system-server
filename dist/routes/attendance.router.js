"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = __importDefault(require("../controllers/attendance.controller"));
const authMiddleLayer = require('../middleware/isAuth');
const router = (0, express_1.Router)();
router.post('/attendance', authMiddleLayer, attendance_controller_1.default.postAttendance);
router.get('/attendance/:Class/:section', authMiddleLayer, attendance_controller_1.default.getAttendance);
router.get('/attendance/', authMiddleLayer, attendance_controller_1.default.getAttendance);
router.put('/attendance', authMiddleLayer, attendance_controller_1.default.updateAttendance);
exports.default = router;
