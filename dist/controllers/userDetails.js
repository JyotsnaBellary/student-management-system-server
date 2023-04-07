"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const holiday_1 = require("../models/holiday");
const userDetails_1 = require("../models/userDetails");
const userDetailsController = {
    // http://localhost:8080/holiday
    postUserDetails(req, res, next) {
        console.log('inside userdetails post');
        const errors = (0, express_validator_1.validationResult)(req);
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
        userDetails_1.UserDetails.findOne({ email: email }).then(dataExists => {
            if (dataExists) {
                const error = new Error('This data has already been added.');
                throw error;
            }
        });
        //     let NewUserDeatails = new UserDetails({
        //         email : email,
        //         userId : userId,
        //         firstName : firstName,
        //         lastName : lastName,
        //         Class : Class,
        //         section : section,
        //         currentAddress : currentAddress,
        //         permanentAddress : permanentAddress});
        //     if(specialization){
        //             NewUserDeatails.department = department,
        //             NewUserDeatails.specialization = specialization
        //     } else if(parentId){
        //         NewUserDeatails.parentId = parentId
        //     }
        //     if(NewUserDeatails){
        //         return NewUserDeatails.save().then(result => {
        //             res.status(201).json({ message: 'User details added!', userDetailsId: result._id });
        //           })
        //     }
        // })
        //   .catch(err => {
        //     if (!err.statusCode) {
        //       err.statusCode = 500;
        //     }
        //     next(err);
        // });
    },
    getUserDetails(req, res, next) {
        return holiday_1.Holiday.find().then(holidays => {
            res.status(200).json({ message: 'Holidays loaded', holidays: holidays });
        }).catch();
    }
};
exports.default = userDetailsController;
