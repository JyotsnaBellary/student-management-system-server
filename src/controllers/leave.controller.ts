import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { Leave } from "../models/leave.model";
import { UserDetails } from "../models/userDetails.model";
const jwt = require('jsonwebtoken');


const leaveController = {
    postLeave(req : Request, res: Response, next: NextFunction) {
        console.log("Inside leave")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }

        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token?.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];
        let firstName = '';
        let lastName = '';
        let Class = '';
        let section = '';
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        const reason = req.body.reason;
        const status = "Applied" ;

        
        UserDetails.findOne({userId:userId}).then(userDetails => {
            firstName = userDetails?.firstName!;
            lastName = userDetails?.lastName!;
            Class = userDetails?.Class!;
            section = userDetails?.section!;

            Leave.findOne({fromDate:fromDate, toDate:toDate}).then(leaveExists => {
                if(leaveExists){
                    const error = new Error('You have already applied leaves for this duration');
                    throw error;
                }
                const newLeave = new Leave({
                    userId : userId,
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
                })
            })

        })
        
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
    },

    ApproveLeave(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        const userId = req.body.userId;
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        console.log(userId, fromDate, toDate);
        Leave.findOne({userId:userId, fromDate:fromDate, toDate:toDate}).then(leaveDetails => {
            let updatedLeave = new Leave({
                userId:leaveDetails?.userId,
                firstName: leaveDetails?.firstName,
                lastName: leaveDetails?.lastName,
                Class: leaveDetails?.Class,
                section: leaveDetails?.section,
                fromDate: leaveDetails?.fromDate,
                toDate: leaveDetails?.toDate,
                reason: leaveDetails?.reason,
                status: 'Approved'
            });
            
            Leave.deleteOne({userId:userId, fromDate:fromDate, toDate:toDate}).then(() => {
                updatedLeave.save().then(result => {
                    console.log("result", result)
                    return res.status(201).json({ message: 'Leave details updated successfully!', leaveApproved: result });  
                })
            })
            console.log(updatedLeave);
        })
    },
    
    getLeave(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        // const bookId = req.params.bookId;
        Leave.find().then(leaveData => {
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
        })
    },

    getStudentLeaves(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        const Class = req.params.Class;
        const section = req.params.section;
        Leave.find({Class:Class, section: section}).then(classLeaves =>{
        if(classLeaves.length === 0){
            const error = new Error('There are no leave details');
            throw error;
        }
        return res.status(201).json({ message: 'Leaves details of class successfully!', Book: classLeaves });  
    })
    },

    getTheStudentLeaves(req : Request, res: Response, next: NextFunction) {
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token?.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];
        const role = decodedToken['role'];
        console.log(role, 'here');
        // let studentAttendanceData
        if(role === "student"){
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array())
            }
            // const userId = req.params.userId;
            Leave.find({userId:userId}).then(Leaves =>{
            if(Leaves.length === 0){
                const error = new Error('There are no leave details');
                throw error;
            }
            return res.status(201).json({ message: 'Leaves details successfully retrieved!', Leaves: Leaves });  
        })
    }
    else if(role === "teacher"){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        // const Class = req.params.Class;
        // const section = req.params.section;
        UserDetails.findOne({userId:userId}).then(Details => {
            Leave.find({Class:Details?.Class, section: Details?.section}).then(classLeaves =>{
                if(classLeaves.length === 0){
                    const error = new Error('There are no leave details');
                    throw error;
                }
                return res.status(201).json({ message: 'Leaves details of class successfully!', Leaves: classLeaves, issuer: "teacher", userId:userId });  
        })
        
    })
    }
    
    }
}

export default leaveController;
