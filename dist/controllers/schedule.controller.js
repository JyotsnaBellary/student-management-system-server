"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const attendance_model_1 = require("../models/attendance.model");
const schedule_model_1 = require("../models/schedule.model");
const userDetails_model_1 = require("../models/userDetails.model");
const checkRole = require('../middleware/checkRoute');
const jwt = require('jsonwebtoken');
const scheduleController = {
    postSchedule(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const MondayArray = req.body.Monday;
        const TuesdayArray = req.body.Tuesday;
        const WednesdayArray = req.body.Wednesday;
        const ThursdayArray = req.body.Thursday;
        const FridayArray = req.body.Friday;
        if (req.body.userId) {
            const userId = req.body.userId;
            const specialization = req.body.specialization;
            schedule_model_1.Schedule.findOne({ userId: userId }).then(schedules => {
                if (schedules) {
                    const error = new Error('You have already applied leaves for this duration');
                    throw error;
                }
                const newSchedule = new schedule_model_1.Schedule({
                    userId: userId,
                    specialization: specialization,
                    Monday: MondayArray,
                    Tuesday: TuesdayArray,
                    Wednesday: WednesdayArray,
                    Thursday: ThursdayArray,
                    Friday: FridayArray
                });
                return newSchedule.save().then(result => {
                    res.status(201).json({ message: 'Schedule added successfully', AttendanceId: result._id });
                })
                    .catch((err) => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                });
            });
        }
        else if (req.body.Class) {
            const Class = req.body.Class;
            const section = req.body.section;
            console.log(Class, section);
            schedule_model_1.Schedule.findOne({ Class: Class, section: section }).then(schedules => {
                if (schedules) {
                    console.log(schedules);
                    const error = new Error('You have already applied leaves for this duration');
                    throw error;
                }
                const newSchedule = new schedule_model_1.Schedule({
                    Class: Class,
                    section: section,
                    Monday: MondayArray,
                    Tuesday: TuesdayArray,
                    Wednesday: WednesdayArray,
                    Thursday: ThursdayArray,
                    Friday: FridayArray
                });
                return newSchedule.save().then(result => {
                    res.status(201).json({ message: 'Schedule added successfully', AttendanceId: result._id });
                })
                    .catch((err) => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                });
            });
        }
    },
    getSchedule(req, res, next) {
        // const role = checkRole/.checkRole();
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token === null || token === void 0 ? void 0 : token.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        if (decodedToken['role'] === "student") {
            userDetails_model_1.UserDetails.findOne({ userId: userId }).then(userDetails => {
                schedule_model_1.Schedule.find({ Class: userDetails === null || userDetails === void 0 ? void 0 : userDetails.Class, section: userDetails === null || userDetails === void 0 ? void 0 : userDetails.section }).then(scheduleData => {
                    if (!scheduleData) {
                        const error = new Error('Could not find schedule details for this id.');
                        // error.statusCode = 404;
                        throw error;
                    }
                    res.status(200).json({ message: 'schedule details fetched.', scheduleData: scheduleData, userRole: decodedToken['role'] });
                });
            }).catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        }
        else if (decodedToken['role'] === "teacher") {
            schedule_model_1.Schedule.find({ userId: userId }).then(scheduleData => {
                if (!scheduleData) {
                    const error = new Error('Could not find schedule details for this id.');
                    // error.statusCode = 404;
                    throw error;
                }
                res.status(200).json({ message: 'schedule details fetched.', scheduleData: scheduleData, userRole: decodedToken['role'] });
            })
                .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        }
    },
    updateAttendance(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        // const Class = req.params.Class;
        // const section = req.params.section;
        const userId = req.body.userId;
        const date = req.body.date;
        const status = req.body.status;
        attendance_model_1.Attendance.findOne({ userId: userId }).then(attendance => {
            if (attendance === null) {
                const error = new Error('There are no attendance details for this student');
                throw error;
            }
            const updateDataIndex = attendance.attendanceArray.findIndex(each => each.date === date);
            attendance.attendanceArray[updateDataIndex].status = status;
            attendance.save();
            return res.status(201).json({ message: 'Attendance details updated successfully!', Book: attendance.attendanceArray });
        });
    }
};
exports.default = scheduleController;
