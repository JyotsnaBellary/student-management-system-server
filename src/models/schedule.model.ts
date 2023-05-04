import mongoose, { Date } from "mongoose";

interface Idaily{
    Class:string;
    section:string;
}

interface ScheduleAttrs {
    userId: String,
    Class : string,
    section: string,
    specialization: string,
    Monday:String[] | Idaily[];
    Tuesday: String[] | Idaily[];
    Wednesday: String[] | Idaily[];
    Thursday: String[] | Idaily[];
    Friday: String[] | Idaily[];
    
   
}


interface ScheduleDoc extends mongoose.Document {
    userId: String,
    Class : String,
    section: string,
    specialization: string,
    Monday:String[] | Idaily[];
    Tuesday: String[] | Idaily[];
    Wednesday: String[] | Idaily[];
    Thursday: String[] | Idaily[];
    Friday: String[] | Idaily[];
    
}

const ScheduleSchema = new mongoose.Schema({
    userId: {
        type:String
    },
    Class: {
        type: String,
    },
    section: {
        type: String,
    },
    specialization: {
        type: String,
    },
    Monday:{ type : [],
        required: true
    },
    Tuesday: { type : [],
        required: true
    },
    Wednesday: { type : [],
        required: true
    },
    
    Thursday: { type : [],
        required: true
    },
    
    Friday: { type : [],
        required: true
    }
});

const Schedule = mongoose.model<ScheduleDoc>('Schedule', ScheduleSchema);

export {Schedule};
