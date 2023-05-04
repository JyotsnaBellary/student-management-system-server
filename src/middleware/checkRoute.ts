import { NextFunction, Response, Request } from "express";
const jwt = require('jsonwebtoken');


export const checkRole = async(req : Request, res: Response, next: NextFunction) => {
  // try{
    // console.log(req.header('Authorization'))
    const token = req.header('Authorization');
    const decodedToken = jwt.verify(token, 'somesupersecretsecret');
    console.log(decodedToken)
    return decodedToken['role'];
}


