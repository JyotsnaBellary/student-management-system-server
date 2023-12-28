"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Details_controller_1 = __importDefault(require("../controllers/Details.controller"));
const authMiddleLayer = require('../middleware/isAuth');
const router = (0, express_1.Router)();
router.post('/userDetails', authMiddleLayer, Details_controller_1.default.postUserDetails);
// router.get('/userDetails/:userId', authMiddleLayer, userDetailsController.getUserDetails);
router.get('/userDetails/', authMiddleLayer, Details_controller_1.default.getUserDetails);
router.post('/parentDetails', authMiddleLayer, Details_controller_1.default.postParentDetails);
router.get('/parentDetails/:parentId', authMiddleLayer, Details_controller_1.default.getParentDetails);
// router.get('/userDetails/:userId', userDetailsController.getUserDetails);
exports.default = router;
