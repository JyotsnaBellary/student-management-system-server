"use strict";
// const { validationResult } = require('express-validator/check');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const holiday_model_1 = require("../models/holiday.model");
const holidayController = {
    // http://localhost:8080/holiday
    addHoliday(req, res, next) {
        console.log('inside holiday post');
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            //     console.log("errors")
            console.log(errors.array());
            // //   const error = new Error('Validation failed.');
            // // //   error.message
            // //   error.message = errors.array()[0].msg;
            // //   throw error;
        }
        const date = req.body.date;
        const day = req.body.day;
        const holiday = req.body.holiday;
        holiday_model_1.Holiday.findOne({ date: date }).then(dateExists => {
            if (dateExists) {
                const error = new Error('This date has already been added to the list of holidays');
                throw error;
            }
            const newHoliday = new holiday_model_1.Holiday({
                holiday: holiday,
                date: date,
                day: day,
            });
            return newHoliday.save().then(result => {
                res.status(201).json({ message: 'Holiday added!', holidayId: result._id });
            });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },
    getHolidays(req, res, next) {
        return holiday_model_1.Holiday.find().then(holidays => {
            res.status(200).json({ message: 'Holidays loaded', holidays: holidays });
        }).catch();
    }
};
exports.default = holidayController;
