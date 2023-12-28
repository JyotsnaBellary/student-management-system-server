"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../controllers/auth"));
const express_validator_1 = require("express-validator");
const router = express_1.Router();
router.post('/signup', [
    express_validator_1.body('email')
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
    express_validator_1.body('password')
        .trim()
        .isLength({ min: 5 }),
    express_validator_1.body('role')
        .trim()
        .not()
        .isEmpty()
], auth_1.default.signup);
router.post('/login', auth_1.default.login);
router.post('/holidays');
exports.default = router;
