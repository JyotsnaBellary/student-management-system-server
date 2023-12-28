// const { validationResult } = require('express-validator/check');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
// import Jwt  from "jsonwebtoken";
import { Error } from "../models/interfaces/error";
import { NextFunction, Request, Response } from "express";
import { Holiday } from "../models/holiday.model";


const holidayController  = {
    // http://localhost:8080/holiday
    addHoliday(req : Request, res: Response, next: NextFunction) {
        console.log('inside holiday post')
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        //     console.log("errors")
            console.log(errors.array())
        // //   const error = new Error('Validation failed.');
        // // //   error.message
        // //   error.message = errors.array()[0].msg;
        // //   throw error;
        }
        const date = req.body.date;
        const day = req.body.day;
        const holiday = req.body.holiday;

        Holiday.findOne({ date: date }).then(dateExists => {
            if(dateExists){
          const error = new Error('This date has already been added to the list of holidays');
          throw error;
            }
            const newHoliday = new Holiday({
              holiday: holiday,
              date: date,
              day: day,
            });
            return newHoliday.save().then(result => {
            res.status(201).json({ message: 'Holiday added!', holidayId: result._id });
          })
        })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
    },


    getHolidays(req : Request, res: Response, next: NextFunction) {
        return Holiday.find().then(holidays => {
            res.status(200).json({message: 'Holidays loaded', holidays: holidays})
        }).catch();
    }
}
export default holidayController