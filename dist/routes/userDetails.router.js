"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Details_1 = __importDefault(require("../controllers/Details"));
const authMiddleLayer = require('../middleware/isAuth');
const router = express_1.Router();
router.post('/userDetails', authMiddleLayer, Details_1.default.postUserDetails);
router.get('/userDetails/:userId', authMiddleLayer, Details_1.default.getUserDetails);
exports.default = router;
