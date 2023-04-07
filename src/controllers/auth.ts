// const { validationResult } = require('express-validator/check');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import Jwt  from "jsonwebtoken";
import { Error } from "../models/interfaces/error";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";


const authController  = {
    signup(req : Request, res: Response, next: NextFunction) {
        console.log('inside signip')
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        //     console.log("errors")
            console.log(errors.array())
        // //   const error = new Error('Validation failed.');
        // // //   error.message
        // //   error.message = errors.array()[0].msg;
        // //   throw error;
        }
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        const userId = req.body.userId;
        User.findOne({ email: email }).then(user => {
            if(user){
          const error = new Error('already user exists');
          throw error;
            }
        
        bcrypt
          .hash(password, 12)
          .then(hashedPw => {
            const user = new User({
              email: email,
              password: hashedPw,
              role: role,
              userId: userId
            });
            return user.save();
          })
          .then(result => {
            res.status(201).json({ message: 'User created!', userId: result._id });
          })
        })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
    },


    login(req : Request, res: Response, next: NextFunction) {

        const email = req.body.email;
        const password = req.body.password;
        let loadedUser: any = null;
        User.findOne({ email: email })
          .then(user => {
            if (!user) {
              const error = new Error('A user with this email could not be found.');
            //   error.statusCode = 401;
              throw error;
            }
            loadedUser = user.toObject();
            return bcrypt.compare(password, user.password);
          })
          .then(isEqual => {
            if (!isEqual) {
              const error = new Error('Wrong password!');
            //   error.statusCode = 401;
              throw error;
            }
            console.log(isEqual);
            const token = Jwt.sign(
              {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
              },
              'somesupersecretsecret',
              { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: loadedUser._id.toString() });
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      }
    

}
export default authController