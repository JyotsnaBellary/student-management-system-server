import { Router } from 'express';
import  authController  from '../controllers/auth';
import { body } from 'express-validator';
import { User } from '../models/user.model';
const router = Router();

router.post('/signup', [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
    //   .custom((value, { req }) => {
    //     return User.findOne({ email: value }).then(userDoc => {
    //         console.log(value, userDoc)
    //       if (userDoc) {
    //         return Promise.reject('E-Mail address already exists!');
    //       }
    //     });
    //   })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('role')
      .trim()
      .not()
      .isEmpty()
  ], authController.signup)

  router.post('/login', authController.login)

  router.post('/holidays')

export default router;

