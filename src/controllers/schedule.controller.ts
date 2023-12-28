import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { Attendance } from "../models/attendance.model";
import { Schedule } from "../models/schedule.model";
import { UserDetails } from "../models/userDetails.model";
const checkRole = require('../middleware/checkRoute')
const jwt = require('jsonwebtoken');



const scheduleController = {
    postSchedule(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        const MondayArray : [] = req.body.Monday;
        const TuesdayArray : [] = req.body.Tuesday;
        const WednesdayArray : [] = req.body.Wednesday;
        const ThursdayArray : [] = req.body.Thursday;
        const FridayArray : [] = req.body.Friday;

        if(req.body.userId){
            const userId = req.body.userId;
            const specialization = req.body.specialization
            Schedule.findOne({userId:userId}).then(schedules => {
                if(schedules){
                    const error = new Error('You have already applied leaves for this duration');
                    throw error;
                }
                const newSchedule = new Schedule({
                    userId : userId,
                    specialization : specialization,
                    Monday: MondayArray,
                    Tuesday: TuesdayArray,
                    Wednesday: WednesdayArray,
                    Thursday: ThursdayArray,
                    Friday: FridayArray
                });
                return newSchedule.save().then(result => {
                    res.status(201).json({ message: 'Schedule added successfully', AttendanceId: result._id });
                })
                .catch((err:any) => {
                    if (!err.statusCode) {
                      err.statusCode = 500;
                    }
                    next(err);
                });
            })
    
        }
        
        else if(req.body.Class){
            const Class = req.body.Class;
            const section = req.body.section;
            console.log(Class, section)
            Schedule.findOne({Class:Class, section:section}).then(schedules => {
                if(schedules){
                    console.log(schedules)
                    const error = new Error('You have already applied leaves for this duration');
                    throw error;
                }
                const newSchedule = new Schedule({
                    Class : Class,
                    section : section,
                    Monday: MondayArray,
                    Tuesday: TuesdayArray,
                    Wednesday: WednesdayArray,
                    Thursday: ThursdayArray,
                    Friday: FridayArray
                });
                return newSchedule.save().then(result => {
                    res.status(201).json({ message: 'Schedule added successfully', AttendanceId: result._id });
                })
                .catch((err:any) => {
                    if (!err.statusCode) {
                      err.statusCode = 500;
                    }
                    next(err);
                });
            })
        
        }   
        
    },
    
    getSchedule(req : Request, res: Response, next: NextFunction) {
        // const role = checkRole/.checkRole();
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token?.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }

        if(decodedToken['role'] === "student"){
            UserDetails.findOne({userId:userId}).then(userDetails => {
                Schedule.find({Class: userDetails?.Class, section: userDetails?.section}).then(scheduleData => {
                    if (!scheduleData) { 
                        const error = new Error('Could not find schedule details for this id.');
                        // error.statusCode = 404;
                        throw error;
                      }
                      res.status(200).json({ message: 'schedule details fetched.', scheduleData: scheduleData, userRole: decodedToken['role'] });
                })
            }).catch(err => {
                if (!err.statusCode) {
                  err.statusCode = 500;
                }
                next(err);
            })
        }
        else if(decodedToken['role'] === "teacher"){
                Schedule.find({userId : userId}).then(scheduleData => {
                    if (!scheduleData) { 
                        const error = new Error('Could not find schedule details for this id.');
                        // error.statusCode = 404;
                        throw error;
                      }
                      res.status(200).json({ message: 'schedule details fetched.', scheduleData: scheduleData , userRole: decodedToken['role']});
                })
                .catch(err => {
                    if (!err.statusCode) {
                      err.statusCode = 500;
                    }
                    next(err);
                })
            }
        
    },

    updateAttendance(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        // const Class = req.params.Class;
        // const section = req.params.section;
        const userId = req.body.userId;
        const date = req.body.date;
        const status = req.body.status;
        Attendance.findOne({userId : userId}).then(attendance =>{
        if(attendance === null){
            const error = new Error('There are no attendance details for this student');
            throw error;
        }
        const updateDataIndex = attendance.attendanceArray.findIndex(each => each.date === date)
        attendance.attendanceArray[updateDataIndex].status = status;
        attendance.save()
        return res.status(201).json({ message: 'Attendance details updated successfully!', Book: attendance.attendanceArray });  
    })
    }
}

export default scheduleController;
