import { Router } from "express";
import userDetailsController from "../controllers/Details";

const authMiddleLayer = require('../middleware/isAuth')
const router = Router();

router.post('/userDetails', authMiddleLayer, userDetailsController.postUserDetails);
router.get('/userDetails/:userId', authMiddleLayer, userDetailsController.getUserDetails);

export default router;
