import mongoose, { Date } from "mongoose";

interface leaveAttrs {
    userId : string,
    firstName: string,
    lastName: string,
    Class: string,
    section: string,
    fromDate : Date,
    toDate : Date,
    reason : string,
    status : string
}

interface leaveDoc extends mongoose.Document {
    userId : string,
    firstName: string,
    lastName: string,
    Class: string,
    section: string,
    fromDate : Date,
    toDate : Date,
    reason : string,
    status : string
}

const leaveSchema = new mongoose.Schema({
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
    fromDate : { type : Date,
        required: true
    },
    toDate : { type : Date,
        required: true
    },
    reason : { type : String,
        required: true
    },
    status : { type : String,
        required: true
    }
});

const Leave = mongoose.model<leaveDoc>('Leave', leaveSchema);

export {Leave};
 