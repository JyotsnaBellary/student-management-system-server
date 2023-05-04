"use strict";
// const { validationResult } = require('express-validator/check');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const authController = {
    signup(req, res, next) {
        console.log('inside signip');
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            //     console.log("errors")
            console.log(errors.array());
            // //   const error = new Error('Validation failed.');
            // // //   error.message
            // //   error.message = errors.array()[0].msg;
            // //   throw error;
        }
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        const userId = req.body.userId;
        user_model_1.User.findOne({ email: email }).then(user => {
            if (user) {
                const error = new Error('already user exists');
                throw error;
            }
            bcryptjs_1.default
                .hash(password, 12)
                .then(hashedPw => {
                const user = new user_model_1.User({
                    email: email,
                    password: hashedPw,
                    role: role,
                    userId: userId
                });
                return user.save();
            })
                .then(result => {
                res.status(201).json({ message: 'User created!', userId: result._id });
            });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },
    login(req, res, next) {
        console.log("inside login");
        const email = req.body.email;
        const password = req.body.password;
        let loadedUser = null;
        user_model_1.User.findOne({ email: email })
            .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                throw error;
            }
            loadedUser = user.toObject();
            return bcryptjs_1.default.compare(password, user.password);
        })
            .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                throw error;
            }
            console.log(isEqual);
            const token = jsonwebtoken_1.default.sign({
                email: loadedUser.email,
                userId: loadedUser.userId,
                role: loadedUser.role
            }, 'somesupersecretsecret', { expiresIn: '1h' });
            res.status(200).json({ token: token, expiresIn: '1h', userId: loadedUser.userId, role: loadedUser.role, email: loadedUser.email });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
};
exports.default = authController;
