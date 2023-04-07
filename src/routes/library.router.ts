import { Router } from "express";
import libraryController from "../controllers/library";

const authMiddleLayer = require('../middleware/isAuth')
const router = Router();

router.post('/books', authMiddleLayer, libraryController.postBooks);
router.get('/books', authMiddleLayer, libraryController.getBooks);

export default router;
