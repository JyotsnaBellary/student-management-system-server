"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
// import { Holiday } from "../models/holiday";
const userDetails_model_1 = require("../models/userDetails.model");
const userDetailsController = {
    //     // http://localhost:8080/details
    postUserDetails(req, res, next) {
        //         console.log('inside userdetails post')
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const email = req.body.email;
        const userId = req.body.userId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const Class = req.body.Class;
        const section = req.body.section;
        const currentAddress = req.body.currentAddress;
        const permanentAddress = req.body.permanentAddress;
        const parentId = req.body.parentId;
        const department = req.body.department;
        const specialization = req.body.specialization;
        console.log(email, userId, firstName, lastName, Class, section, currentAddress, permanentAddress, parentId, department, specialization);
        userDetails_model_1.UserDetails.findOne({ email: email }).then(dataExists => {
            if (dataExists) {
                const error = new Error('This data has already been added.');
                throw error;
            }
            let NewUserDeatails = new userDetails_model_1.UserDetails({
                email: email,
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                Class: Class,
                section: section,
                currentAddress: currentAddress,
                permanentAddress: permanentAddress
            });
            if (specialization) {
                NewUserDeatails.department = department,
                    NewUserDeatails.specialization = specialization;
            }
            else if (parentId) {
                NewUserDeatails.parentId = parentId;
            }
            console.log(NewUserDeatails);
            return NewUserDeatails.save()
                .then(result => {
                res.status(201).json({ message: 'User details added!', userDetailsId: result._id });
            });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },
    getUserDetails(req, res, next) {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const userId = req.params.userId;
        userDetails_model_1.UserDetails.findOne({ userId: userId }).then(userDetails => {
            if (!userDetails) {
                const error = new Error('Could not find user details for this id.');
                // error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'User details fetched.', userDetails: userDetails });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
};
exports.default = userDetailsController;
