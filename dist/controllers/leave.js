"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const leave_model_1 = require("../models/leave.model");
const leaveController = {
    postLeave(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const userId = req.body.userId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const Class = req.body.Class;
        const section = req.body.section;
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        const reason = req.body.reason;
        const status = req.body.status;
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
                reason: reason,
                status: status
            });
            if (req.body.toDate) {
                newLeave.toDate = req.body.toDate;
            }
            else {
                newLeave.toDate = req.body.fromDate;
            }
            return newLeave.save().then(result => {
                res.status(201).json({ message: 'Leave applied successfully', LeaveId: result._id });
            });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
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
        const userId = req.body.userId;
        leave_model_1.Leave.find({ Class: Class, section: section }).then(classLeaves => {
            if (classLeaves.length === 0) {
                const error = new Error('There are no leave details');
                throw error;
            }
            return res.status(201).json({ message: 'Leaves details of class successfully!', Book: classLeaves });
        });
    }
};
exports.default = leaveController;
