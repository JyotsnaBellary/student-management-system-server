"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const library_1 = __importDefault(require("../controllers/library"));
const authMiddleLayer = require('../middleware/isAuth');
const router = (0, express_1.Router)();
router.post('/books', authMiddleLayer, library_1.default.postBooks);
router.get('/books', authMiddleLayer, library_1.default.getBooks);
exports.default = router;
