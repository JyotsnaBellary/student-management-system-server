"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const invigilationDetails_model_1 = require("../models/invigilationDetails.model");
const invigilationController = {
    addInvigilation(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const teacherId = req.body.teacherId;
        const Class = req.body.Class;
        const section = req.body.section;
        const date = req.body.date;
        const day = req.body.day;
        const subject = req.body.subject;
        invigilationDetails_model_1.Invigilation.findOne({ date: date, teacherId: teacherId }).then(dateExists => {
            if (dateExists) {
                // console.log(dateExists)
                const error = new Error('This date has already been assigned to this teacher');
                throw error;
            }
            const newInvigilationDetails = new invigilationDetails_model_1.Invigilation({
                teacherId: teacherId,
                Class: Class,
                section: section,
                date: date,
                day: day,
                subject: subject
            });
            return newInvigilationDetails.save().then(result => {
                res.status(201).json({ message: 'Invigilation details added!', InvigilationId: result._id });
            });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },
    getInvigilationDetails(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const teacherId = req.params.userId;
        invigilationDetails_model_1.Invigilation.find({ teacherId: teacherId }).then(InvigilationDetails => {
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
    },
    updateInvigilationDetails(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const id = req.params.id;
        const Class = req.body.Class;
        const section = req.body.section;
        const day = req.body.day;
        const date = req.body.date;
        const subject = req.body.subject;
        invigilationDetails_model_1.Invigilation.findById(id).then(invigilationDetails => {
            if (!invigilationDetails) {
                const error = new Error('Could not find post.');
                throw error;
            }
            invigilationDetails.Class = Class;
            invigilationDetails.section = section;
            invigilationDetails.day = day;
            invigilationDetails.date = date;
            invigilationDetails.subject = subject;
            return invigilationDetails.save();
        })
            .then(result => {
            res.status(200).json({ message: 'Invigilation details updated', InvigilationDetails: result });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
};
exports.default = invigilationController;
