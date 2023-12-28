"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const holidays_1 = __importDefault(require("../controllers/holidays"));
// import { isAuthMiddle } from '../middleware/isAuth';
const authMiddleLayer = require('../middleware/isAuth');
const router = express_1.Router();
router.post('/holiday', authMiddleLayer, holidays_1.default.addHoliday);
//   router.post('/holiday', holidayController.addHoliday)
// http://localhost:8080/holidays
router.get('/holidays', authMiddleLayer, holidays_1.default.getHolidays);
router.put('/holiday/:holidayId');
router.delete('/holiday/:holidayId');
exports.default = router;
