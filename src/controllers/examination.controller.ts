import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { Examination } from "../models/examinationDetails.model";
import { Invigilation } from "../models/invigilationDetails.model";
import { UserDetails } from "../models/userDetails.model";
const jwt = require('jsonwebtoken');

const examinationController = {
    addExamination(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        const Class = req.body.Class;
        const schedule = req.body.schedule;
    
        // let schedulelist : {
        //     date: { type: Date, required: true},
        //     day: { type: String, required: true},
        //     subject: { type: String, required: true},
        // }[] = []

        for(let i =0; i < schedule.length; i++){
        //     schedulelist.push(schedule[i]);
        // }
        Examination.find({Class:Class, date:schedule[i].date}).then(scheduleExists => {
            if(scheduleExists){
                console.log(scheduleExists)
                const error = new Error('This examination date has already been added for this class!');
                throw error;
            }
            const newExaminationDetails = new Examination({
                Class:Class,
                day: schedule[i].day,
                date:schedule[i].date,
                subject: schedule[i].subject
            });
            return newExaminationDetails.save().then(result => {
                res.status(201).json({ message: 'Examination details added!', InvigilationId: result._id });
            })
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
        }
    },

    getExaminationDetails(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token?.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];
        
        if(decodedToken['role'] === "student"){
            UserDetails.findOne({userId:userId}).then(userDetails => {
                Examination.find({Class : userDetails?.Class}).then(ExaminationDetails => {
                    if(!ExaminationDetails){
                        const error = new Error('Could not find Examination details for this class.');
                        // error.statusCode = 404;
                        throw error;
                    }
                    res.status(200).json({ message: 'Examination details fetched.', ExaminationDetails: ExaminationDetails });
                })
            })
            .catch(err => {
                if (!err.statusCode) {
                  err.statusCode = 500;
                }
                next(err);
            });
        }
        else if(decodedToken['role'] === "teacher"){
            Invigilation.find({teacherId:userId}).then(InvigilationDetails => {
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
                }
            );
        }
        

    },

    updateExaminationDetails(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }

        const id = req.params.id;
        const Class = req.body.Class;
        const day = req.body.day;
        const date = req.body.date;
        const subject = req.body.subject;

        Examination.findById(id).then(examinationDetails => {
            if(!examinationDetails){
                const error = new Error('Could not find post.');
                throw error;
            }
            examinationDetails.day = day;
            examinationDetails.date = date;
            examinationDetails.subject = subject;
            return examinationDetails.save();
        })
        .then(result => {
            res.status(200).json({message: 'Examination details updated', examinationDetails:result})
        })
        .catch(err => {
            if (!err.statusCode) {
            err.statusCode = 500;
            }
            next(err);
        }
    );

    }
    
}

export default examinationController
