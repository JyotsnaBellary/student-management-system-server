import mongoose, { Date } from "mongoose";

interface ExaminationAttrs {
    Class : string,
    date: Date,
    day: string,
    subject: string,
}


interface ExaminationDoc extends mongoose.Document {
    Class : string,
    date: Date,
    day: string,
    subject: string,
}

const ExaminationSchema = new mongoose.Schema({
    Class: {
        type: String,
        required: true
    },
    // Schedule: {
    //     type: 
    //     Array,
    //     "default" : [],
        // [{
    date: { type: Date, required: true},
    day: { type: String, required: true},
    subject: { type: String, required: true},
        // }],
        // required: true
    // }
    
});

const Examination = mongoose.model<ExaminationDoc>('Examination', ExaminationSchema);

export {Examination};
