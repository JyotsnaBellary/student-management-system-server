import mongoose, { Date } from "mongoose";

interface attendanceStatus {
    date : Date,
    status: number
}
interface attendanceAttrs {
    userId : string,
    firstName: string,
    lastName: string,
    Class: string,
    section: string,
    attendanceArray: attendanceStatus[]
}

interface attendanceDoc extends mongoose.Document {
    userId : string,
    firstName: string,
    lastName: string,
    Class: string,
    section: string,
    attendanceArray: attendanceStatus[]
}

const attendanceSchema = new mongoose.Schema({
    userId : { type : String,
        required: true
    },
    firstName : { type : String,
        required: true
    },
    lastName : { type : String,
        required: true
    },
    Class : { type : String,
        required: true
    },
    section : { type : String,
        required: true
    },
    attendanceArray : { type : [],
        required: true
    }
});

const Attendance = mongoose.model<attendanceDoc>('Attendance', attendanceSchema);

export {Attendance};
 