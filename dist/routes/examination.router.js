"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const examination_controller_1 = __importDefault(require("../controllers/examination.controller"));
const authMiddleLayer = require('../middleware/isAuth');
const router = (0, express_1.Router)();
// router.post('/examinations', authMiddleLayer, examinationController.addExamination);
// router.get('/examinations/:Class', examinationController.getExaminationDetails);
router.get('/examinations/', authMiddleLayer, examination_controller_1.default.getExaminationDetails);
// router.put('/examinations/:id', authMiddleLayer, examinationController.updateExaminationDetails);
exports.default = router;
