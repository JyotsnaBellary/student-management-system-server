"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const attendance_model_1 = require("../models/attendance.model");
const userDetails_model_1 = require("../models/userDetails.model");
// const checkRole = require('../middleware/checkRoute')
const jwt = require('jsonwebtoken');
const attendanceController = {
    postAttendance(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        // console.log()
        const userId = req.body.userId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const Class = req.body.Class;
        const section = req.body.section;
        const attendanceArray = req.body.attendanceArray;
        // console.log(attendanceArray.forEach(ele => console.log(ele) ));
        attendance_model_1.Attendance.findOne({ userId: userId }).then((attendance) => {
            if (attendance) {
                const error = new Error('You have already applied leaves for this duration');
                throw error;
            }
            const newAttendance = new attendance_model_1.Attendance({
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                Class: Class,
                section: section,
                attendanceArray: attendanceArray
            });
            return newAttendance.save().then(result => {
                res.status(201).json({ message: 'Attendance updated successfully', AttendanceId: result._id });
            });
        })
            .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },
    getAttendance(req, res, next) {
        // const role = checkRole.checkRole();
        console.log("getting attendance");
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        // const bookId = req.params.bookId;
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token === null || token === void 0 ? void 0 : token.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];
        const role = decodedToken['role'];
        console.log(role, 'here');
        // let studentAttendanceData
        if (role === "student") {
            attendance_model_1.Attendance.find({ userId: userId }).then(attendanceData => {
                if (!attendanceData) {
                    const error = new Error('Could not find attendance details for this id.');
                    // error.statusCode = 404;
                    throw error;
                }
                res.status(200).json({ message: 'attendance details fetched.', attendanceData: attendanceData });
            })
                .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        }
        else if (role === "teacher") {
            userDetails_model_1.UserDetails.findOne({ userId: userId }).then(details => {
                console.log(details, "role is teacher");
                attendance_model_1.Attendance.find({ Class: details === null || details === void 0 ? void 0 : details.Class, section: details === null || details === void 0 ? void 0 : details.section }).then(attendanceData => {
                    if (!attendanceData) {
                        const error = new Error('Could not find attendance details for this id.');
                        // error.statusCode = 404;
                        throw error;
                    }
                    console.log(attendanceData);
                    res.status(200).json({ message: 'attendance details fetched.', attendanceData: attendanceData });
                });
            })
                .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        }
        // const Class = req.params.Class;
        // const section = req.params.section;
        // Attendance.find({Class:Class, section:section}).then(attendanceData => {
        //     if (!attendanceData) { 
        //         const error = new Error('Could not find attendance details for this id.');
        //         // error.statusCode = 404;
        //         throw error;
        //       }
        //       res.status(200).json({ message: 'attendance details fetched.', attendanceData: attendanceData });
        // })
        // .catch(err => {
        //     if (!err.statusCode) {
        //       err.statusCode = 500;
        //     }
        //     next(err);
        // })
    },
    updateAttendance(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        // const Class = req.params.Class;
        // const section = req.params.section;
        console.log("Updating Attendance", req.body.status);
        const userId = req.body.userId;
        const date = req.body.date;
        const status = req.body.status;
        attendance_model_1.Attendance.findOne({ userId: userId }).then(attendance => {
            if (attendance === null) {
                const error = new Error('There are no attendance details for this student');
                throw error;
            }
            const updateDataIndex = attendance.attendanceArray.findIndex(each => each.date === date);
            if (!updateDataIndex) {
                attendance.attendanceArray.push({ date: date, status: status });
                console.log(attendance.attendanceArray);
                attendance.save().then(result => {
                    return res.status(201).json({ message: 'Attendance details updated successfully!', Book: attendance.attendanceArray });
                });
            }
            else {
                attendance.attendanceArray[updateDataIndex].status = status;
                const updatedAttendance = new attendance_model_1.Attendance({
                    userId: userId,
                    firstName: attendance.firstName,
                    lastName: attendance.lastName,
                    Class: attendance.Class,
                    section: attendance.section,
                    attendanceArray: attendance.attendanceArray
                });
                console.log("lines 144", updatedAttendance, attendance.attendanceArray[updateDataIndex].date, attendance.attendanceArray[updateDataIndex].status);
                attendance_model_1.Attendance.deleteOne({ userId: userId }).then(() => {
                    updatedAttendance.save().then(result => {
                        console.log("result", result);
                        return res.status(201).json({ message: 'Attendance details updated successfully!', attendance: result });
                    });
                });
            }
        });
    }
};
exports.default = attendanceController;
