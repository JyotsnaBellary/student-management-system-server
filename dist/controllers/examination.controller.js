"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const examinationDetails_model_1 = require("../models/examinationDetails.model");
const invigilationDetails_model_1 = require("../models/invigilationDetails.model");
const userDetails_model_1 = require("../models/userDetails.model");
const jwt = require('jsonwebtoken');
const examinationController = {
    addExamination(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const Class = req.body.Class;
        const schedule = req.body.schedule;
        // let schedulelist : {
        //     date: { type: Date, required: true},
        //     day: { type: String, required: true},
        //     subject: { type: String, required: true},
        // }[] = []
        for (let i = 0; i < schedule.length; i++) {
            //     schedulelist.push(schedule[i]);
            // }
            examinationDetails_model_1.Examination.find({ Class: Class, date: schedule[i].date }).then(scheduleExists => {
                if (scheduleExists) {
                    console.log(scheduleExists);
                    const error = new Error('This examination date has already been added for this class!');
                    throw error;
                }
                const newExaminationDetails = new examinationDetails_model_1.Examination({
                    Class: Class,
                    day: schedule[i].day,
                    date: schedule[i].date,
                    subject: schedule[i].subject
                });
                return newExaminationDetails.save().then(result => {
                    res.status(201).json({ message: 'Examination details added!', InvigilationId: result._id });
                });
            })
                .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        }
    },
    getExaminationDetails(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token === null || token === void 0 ? void 0 : token.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];
        if (decodedToken['role'] === "student") {
            userDetails_model_1.UserDetails.findOne({ userId: userId }).then(userDetails => {
                examinationDetails_model_1.Examination.find({ Class: userDetails === null || userDetails === void 0 ? void 0 : userDetails.Class }).then(ExaminationDetails => {
                    if (!ExaminationDetails) {
                        const error = new Error('Could not find Examination details for this class.');
                        // error.statusCode = 404;
                        throw error;
                    }
                    res.status(200).json({ message: 'Examination details fetched.', ExaminationDetails: ExaminationDetails });
                });
            })
                .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        }
        else if (decodedToken['role'] === "teacher") {
            invigilationDetails_model_1.Invigilation.find({ teacherId: userId }).then(InvigilationDetails => {
                if (!InvigilationDetails) {
                    const error = new Error('Could not find invigilation details for this id.');
                    // error.statusCode = 404;
                    throw error;
                }
                res.status(200).json({ message: 'Invigilation details fetched.', InvigilationDetails: InvigilationDetails });
            })
                .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        }
    },
    updateExaminationDetails(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const id = req.params.id;
        const Class = req.body.Class;
        const day = req.body.day;
        const date = req.body.date;
        const subject = req.body.subject;
        examinationDetails_model_1.Examination.findById(id).then(examinationDetails => {
            if (!examinationDetails) {
                const error = new Error('Could not find post.');
                throw error;
            }
            examinationDetails.day = day;
            examinationDetails.date = date;
            examinationDetails.subject = subject;
            return examinationDetails.save();
        })
            .then(result => {
            res.status(200).json({ message: 'Examination details updated', examinationDetails: result });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
};
exports.default = examinationController;
