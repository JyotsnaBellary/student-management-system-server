"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedule_controller_1 = __importDefault(require("../controllers/schedule.controller"));
const authMiddleLayer = require('../middleware/isAuth');
const router = (0, express_1.Router)();
router.post('/schedule', schedule_controller_1.default.postSchedule);
router.get('/schedule/:Class/:section', authMiddleLayer, schedule_controller_1.default.getSchedule);
router.get('/schedule/', authMiddleLayer, schedule_controller_1.default.getSchedule);
exports.default = router;
