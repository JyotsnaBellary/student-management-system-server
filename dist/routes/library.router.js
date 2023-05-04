"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const library_controlller_1 = __importDefault(require("../controllers/library.controlller"));
const authMiddleLayer = require('../middleware/isAuth');
const router = (0, express_1.Router)();
router.post('/books', authMiddleLayer, library_controlller_1.default.postBooks);
// router.get('/books', authMiddleLayer, libraryController.getBooks);
router.get('/books', authMiddleLayer, library_controlller_1.default.getBooks);
router.post('/borrowBook', authMiddleLayer, authMiddleLayer, library_controlller_1.default.borrowBook);
router.get('/borrowedBook/', authMiddleLayer, library_controlller_1.default.borrowedBooksData);
router.get('/Book/:bookId', authMiddleLayer, library_controlller_1.default.getBook);
router.get('/returnBook/:userId/:bookId', authMiddleLayer, library_controlller_1.default.returnBook);
exports.default = router;
