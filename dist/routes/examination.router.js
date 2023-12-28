"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const examination_1 = __importDefault(require("../controllers/examination"));
const authMiddleLayer = require('../middleware/isAuth');
const router = express_1.Router();
router.post('/examinations', authMiddleLayer, examination_1.default.addExamination);
router.get('/examinations/:Class', authMiddleLayer, examination_1.default.getExaminationDetails);
router.put('/examinations/:id', authMiddleLayer, examination_1.default.updateExaminationDetails);
exports.default = router;
