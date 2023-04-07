import mongoose, { Date } from "mongoose";

interface InvigilationAttrs {
    teacherId: string,
    Class : string,
    section : string
    day: string,
    date: Date,
    subject: string,
}

interface InvigilationDoc extends mongoose.Document {
    teacherId: string,
    Class : string,
    section : string
    day: string,
    date: Date,
    subject: string,
}

const invigilationSchema = new mongoose.Schema({
    teacherId: {
        type: String,
        required: true
    },
    Class: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    
});

const Invigilation = mongoose.model<InvigilationDoc>('Invigilation', invigilationSchema);

export {Invigilation};
