import mongoose, { Date } from "mongoose";

interface libraryAttrs {
    bookId : string,
    userId : string,
    borrowedDate : Date,
    returnDate : Date
}

interface libraryDoc extends mongoose.Document {
    bookId : string,
    userId : string,
    borrowedDate : Date,
    returnDate : Date,
}

const librarySchema = new mongoose.Schema({
    bookId : { type : String,
        required: true
    },
    userId : { type : String,
        required: true
    },
    borrowedDate : { type : Date,
        required: true
    },
    returnDate : { type : String,
        required: true
    }
});

const Library = mongoose.model<libraryDoc>('Library', librarySchema);

export {Library};
 