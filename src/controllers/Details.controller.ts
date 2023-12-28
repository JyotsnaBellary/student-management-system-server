
import { validationResult } from "express-validator";
// import bcrypt from "bcryptjs";
// // import Jwt  from "jsonwebtoken";
// import { Error } from "../models/interfaces/error";
import { NextFunction, Request, Response } from "express";
// import { Holiday } from "../models/holiday";
import { UserDetails } from "../models/userDetails.model";
import { ParentDetails } from "../models/parentDetails.model";
const jwt = require('jsonwebtoken');


const userDetailsController  = {

//     // http://localhost:8080/details
    postUserDetails(req : Request, res: Response, next: NextFunction) {
//         console.log('inside userdetails post')
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        
        }
        const email = req.body.email
        const userId = req.body.userId
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const Class = req.body.Class;
        const section = req.body.section;
        const currentAddress = req.body.currentAddress;
        const permanentAddress = req.body.permanentAddress;
        const parentId = req.body.parentId;
        const department = req.body.department;
        const specialization = req.body.specialization;

        console.log(email,userId,firstName,lastName,Class,section,currentAddress,permanentAddress, parentId,department,specialization)
        UserDetails.findOne({email:email}).then(dataExists => {
            if(dataExists){
              const error = new Error('This data has already been added.');
              throw error;
            }
            let NewUserDeatails = new UserDetails({
                email : email,
                userId : userId,
                firstName : firstName,
                lastName : lastName,
                Class : Class,
                section : section,
                currentAddress : currentAddress,
                permanentAddress : permanentAddress
            });
            if(specialization){
                NewUserDeatails.department = department,
                NewUserDeatails.specialization = specialization
            } else if(parentId){
                NewUserDeatails.parentId = parentId
            }
            console.log(NewUserDeatails);
            return NewUserDeatails.save()
                .then(result => {
                res.status(201).json({ message: 'User details added!', userDetailsId: result._id });
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },

    postParentDetails(req : Request, res: Response, next: NextFunction) {
        //         console.log('inside userdetails post')
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    console.log(errors.array())
                
                }
                const parentId = req.body.parentId
                const fatherName = req.body.fatherName
                const phonesNumberOfFather = req.body.phonesNumberOfFather;
                const emailOfFather = req.body.emailOfFather;
                const motherName = req.body.motherName;
                const phonesNumberOfMother = req.body.phonesNumberOfMother;
                const emailOfMother = req.body.emailOfMother;
                
                // console.log(email,userId,firstName,lastName,Class,section,currentAddress,permanentAddress, parentId,department,specialization)
                ParentDetails.findOne({parentId:parentId}).then(dataExists => {
                    if(dataExists){
                      const error = new Error('This data has already been added.');
                      throw error;
                    }
                    let NewParentDeatails = new ParentDetails({
                        parentId : parentId,
                        fatherName : fatherName,
                        phonesNumberOfFather : phonesNumberOfFather,
                        emailOfFather : emailOfFather,
                        motherName : motherName,
                        phonesNumberOfMother : phonesNumberOfMother,
                        emailOfMother : emailOfMother
                    });
                    
                    console.log(NewParentDeatails);
                    return NewParentDeatails.save()
                        .then(result => {
                        res.status(201).json({ message: 'Parent details added!', userDetailsId: result._id });
                    })
                })
                .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                });
            },

    getUserDetails(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        // console.log("inside get method");
        // const userId = req.params.userId;
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token?.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];

        console.log(userId)
        // UserDetails.findById(userId).then(userDetails => {
            UserDetails.findOne({userId:userId}).then(userDetails => {
            if (!userDetails) {
                const error = new Error('Could not find user details for this id.');
                // error.statusCode = 404;
                throw error;
              }
              console.log(userDetails)
            return  res.status(200).json({ message: 'User details fetched.', userDetails: userDetails });
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        })
    },

    getParentDetails(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        // console.log("inside get method");
        const parentId = req.params.parentId;
        console.log(parentId, "here")
        // UserDetails.findById(userId).then(userDetails => {
            ParentDetails.findOne({parentId:parentId}).then(parentDetails => {
            if (!parentDetails) {
                const error = new Error('Could not find user details for this id.');
                // error.statusCode = 404;
                throw error;
              }
              console.log(parentDetails)
            return  res.status(200).json({ message: 'Parent details fetched.', parentDetails: parentDetails });
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        })
    }
}
export default userDetailsController
