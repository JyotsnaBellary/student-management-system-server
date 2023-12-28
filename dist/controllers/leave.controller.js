"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const leave_model_1 = require("../models/leave.model");
const userDetails_model_1 = require("../models/userDetails.model");
const jwt = require('jsonwebtoken');
const leaveController = {
    postLeave(req, res, next) {
        console.log("Inside leave");
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token === null || token === void 0 ? void 0 : token.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];
        let firstName = '';
        let lastName = '';
        let Class = '';
        let section = '';
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        const reason = req.body.reason;
        const status = "Applied";
        userDetails_model_1.UserDetails.findOne({ userId: userId }).then(userDetails => {
            firstName = userDetails === null || userDetails === void 0 ? void 0 : userDetails.firstName;
            lastName = userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastName;
            Class = userDetails === null || userDetails === void 0 ? void 0 : userDetails.Class;
            section = userDetails === null || userDetails === void 0 ? void 0 : userDetails.section;
            leave_model_1.Leave.findOne({ fromDate: fromDate, toDate: toDate }).then(leaveExists => {
                if (leaveExists) {
                    const error = new Error('You have already applied leaves for this duration');
                    throw error;
                }
                const newLeave = new leave_model_1.Leave({
                    userId: userId,
                    firstName: firstName,
                    lastName: lastName,
                    Class: Class,
                    section: section,
                    fromDate: fromDate,
                    toDate: toDate,
                    reason: reason,
                    status: status
                });
                return newLeave.save().then(result => {
                    res.status(201).json({ message: 'Leave applied successfully', LeaveId: result._id });
                });
            });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },
    ApproveLeave(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const userId = req.body.userId;
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        console.log(userId, fromDate, toDate);
        leave_model_1.Leave.findOne({ userId: userId, fromDate: fromDate, toDate: toDate }).then(leaveDetails => {
            let updatedLeave = new leave_model_1.Leave({
                userId: leaveDetails === null || leaveDetails === void 0 ? void 0 : leaveDetails.userId,
                firstName: leaveDetails === null || leaveDetails === void 0 ? void 0 : leaveDetails.firstName,
                lastName: leaveDetails === null || leaveDetails === void 0 ? void 0 : leaveDetails.lastName,
                Class: leaveDetails === null || leaveDetails === void 0 ? void 0 : leaveDetails.Class,
                section: leaveDetails === null || leaveDetails === void 0 ? void 0 : leaveDetails.section,
                fromDate: leaveDetails === null || leaveDetails === void 0 ? void 0 : leaveDetails.fromDate,
                toDate: leaveDetails === null || leaveDetails === void 0 ? void 0 : leaveDetails.toDate,
                reason: leaveDetails === null || leaveDetails === void 0 ? void 0 : leaveDetails.reason,
                status: 'Approved'
            });
            leave_model_1.Leave.deleteOne({ userId: userId, fromDate: fromDate, toDate: toDate }).then(() => {
                updatedLeave.save().then(result => {
                    console.log("result", result);
                    return res.status(201).json({ message: 'Leave details updated successfully!', leaveApproved: result });
                });
            });
            console.log(updatedLeave);
        });
    },
    getLeave(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        // const bookId = req.params.bookId;
        leave_model_1.Leave.find().then(leaveData => {
            if (!leaveData) {
                const error = new Error('Could not find leave details for this id.');
                // error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Leave details fetched.', leaveData: leaveData });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },
    getStudentLeaves(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const Class = req.params.Class;
        const section = req.params.section;
        leave_model_1.Leave.find({ Class: Class, section: section }).then(classLeaves => {
            if (classLeaves.length === 0) {
                const error = new Error('There are no leave details');
                throw error;
            }
            return res.status(201).json({ message: 'Leaves details of class successfully!', Book: classLeaves });
        });
    },
    getTheStudentLeaves(req, res, next) {
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token === null || token === void 0 ? void 0 : token.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];
        const role = decodedToken['role'];
        console.log(role, 'here');
        // let studentAttendanceData
        if (role === "student") {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
            }
            // const userId = req.params.userId;
            leave_model_1.Leave.find({ userId: userId }).then(Leaves => {
                if (Leaves.length === 0) {
                    const error = new Error('There are no leave details');
                    throw error;
                }
                return res.status(201).json({ message: 'Leaves details successfully retrieved!', Leaves: Leaves });
            });
        }
        else if (role === "teacher") {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
            }
            // const Class = req.params.Class;
            // const section = req.params.section;
            userDetails_model_1.UserDetails.findOne({ userId: userId }).then(Details => {
                leave_model_1.Leave.find({ Class: Details === null || Details === void 0 ? void 0 : Details.Class, section: Details === null || Details === void 0 ? void 0 : Details.section }).then(classLeaves => {
                    if (classLeaves.length === 0) {
                        const error = new Error('There are no leave details');
                        throw error;
                    }
                    return res.status(201).json({ message: 'Leaves details of class successfully!', Leaves: classLeaves, issuer: "teacher", userId: userId });
                });
            });
        }
    }
};
exports.default = leaveController;
