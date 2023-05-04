import { Router } from "express";
import libraryController from "../controllers/library.controlller";

const authMiddleLayer = require('../middleware/isAuth')
const router = Router();

router.post('/books', authMiddleLayer, libraryController.postBooks);
// router.get('/books', authMiddleLayer, libraryController.getBooks);
router.get('/books', authMiddleLayer, libraryController.getBooks);
router.post('/borrowBook', authMiddleLayer, authMiddleLayer, libraryController.borrowBook);
router.get('/borrowedBook/', authMiddleLayer, libraryController.borrowedBooksData);
router.get('/Book/:bookId', authMiddleLayer, libraryController.getBook);
router.get('/returnBook/:userId/:bookId', authMiddleLayer, libraryController.returnBook);

export default router;
