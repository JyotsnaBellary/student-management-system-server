"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invigilation_1 = __importDefault(require("../controllers/invigilation"));
const authMiddleLayer = require('../middleware/isAuth');
const router = express_1.Router();
router.post('/invigilation', authMiddleLayer, invigilation_1.default.addInvigilation);
router.get('/examinations/:userId', authMiddleLayer, invigilation_1.default.getInvigilationDetails);
router.put('/invigilation/:id', authMiddleLayer, invigilation_1.default.updateInvigilationDetails);
exports.default = router;
