import { Router } from "express";
import userDetailsController from "../controllers/Details.controller";

const authMiddleLayer = require('../middleware/isAuth')
const router = Router();

router.post('/userDetails', authMiddleLayer, userDetailsController.postUserDetails);
// router.get('/userDetails/:userId', authMiddleLayer, userDetailsController.getUserDetails);
router.get('/userDetails/', authMiddleLayer, userDetailsController.getUserDetails);
router.post('/parentDetails', authMiddleLayer, userDetailsController.postParentDetails);
router.get('/parentDetails/:parentId', authMiddleLayer, userDetailsController.getParentDetails);

// router.get('/userDetails/:userId', userDetailsController.getUserDetails);

export default router;
