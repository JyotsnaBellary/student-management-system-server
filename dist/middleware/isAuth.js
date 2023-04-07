"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {  Error } from "../models/interfaces/request";
const mongoose_1 = require("mongoose");
const jwt = require('jsonwebtoken');
const isAuthMiddle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token, 'somesupersecretsecret');
        console.log(decodedToken);
        // console.log(decodedToken['email']);
        next();
    }
    catch (err) {
        console.log(err);
        const error = new mongoose_1.Error('Not authenticated');
        throw error;
    }
});
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
