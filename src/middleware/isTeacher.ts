import { NextFunction, Response, Request } from "express";
// import {  Error } from "../models/interfaces/request";
import { Error } from "mongoose";
const jwt = require('jsonwebtoken');

const isAuthMiddle = async (req : Request, res: Response, next: NextFunction) => {
  try{
    const token = req.header('Authorization');
    const decodedToken = jwt.verify(token, 'somesupersecretsecret');
    // console.log(decodedToken);
    // console.log(decodedToken['email']);
    
    next();
  }catch(err){
    const error = new Error('Not authenticated');
    throw error;
  }
}

module.exports = isAuthMiddle;