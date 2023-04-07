import mongoose, { Date } from "mongoose";

interface holidayAttrs {
    date: Date,
    day: string,
    holiday: string,
}

interface HolidayDoc extends mongoose.Document {
    date: Date,
    day: string,
    holiday: string,
}

const holidaySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    holiday: {
        type: String,
        required: true
    },
    
});

const Holiday = mongoose.model<HolidayDoc>('Holiday', holidaySchema);

export {Holiday};
