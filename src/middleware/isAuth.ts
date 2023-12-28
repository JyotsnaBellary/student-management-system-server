import { NextFunction, Response, Request } from "express";
// import {  Error } from "../models/interfaces/request";
import { Error } from "mongoose";
const jwt = require('jsonwebtoken');
let userInSession!: string;

const isAuthMiddle = async (req : Request, res: Response, next: NextFunction) => {
  try{
    const token = req.header('Authorization');
    // console.log("Inside auth check", token);
    // const decodedToken = jwt.verify(token, 'somesupersecretsecret');
    const decodedToken = jwt.verify(token?.split(' ')[1], 'somesupersecretsecret');
    // console.log(decodedToken);
    console.log(decodedToken['role']);
    userInSession = decodedToken['userId'];
    next();
  }catch(err){
    console.log(err)
    const error = new Error('Not authenticated');
    // throw error;
  }
}

module.exports = isAuthMiddle;

// export
// export const Authenticate = {
// isAuth (req : Request, res: Response, next: NextFunction)  {
//   const authHeader = req.get('Authorization');
//   if (!authHeader) {
//     const error = new Error('Not authenticated.');
//     // error.statusCode = 401;
//     throw error;
//   }
//   const token = authHeader.split(' ')[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, 'somesupersecretsecret');
//     console.log(decodedToken);
//   } catch (err) {
//     // err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedToken) {
//     const error = new Error('Not authenticated.');
//     // error.statusCode = 401;
//     throw error;
//   }
//   if(req.userId){
//     req.userId = decodedToken.userId;
//     console.log('successful auth');
//   }
//   next();
// }
// }
