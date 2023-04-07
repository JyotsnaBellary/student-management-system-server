import mongoose from "mongoose";

interface UserDetailsAttrs {
    userId: String,
    email: String,
    firstName: string,
    lastName: string,
    Class : string,
    section: string,
    currentAddress: string,
    permanentAddress:string,
    parentId: string,
    department: string,
    specialization: string
    }
interface UserDetailsDoc extends mongoose.Document {
    userId: String,
    email: String,
    firstName: string,
    lastName: string,
    Class : string,
    section: string,
    currentAddress: string,
    permanentAddress:string,
    parentId: string,
    department: string,
    specialization: string
}

const userDetailsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    currentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    parentId: {
        type: String,
    },
    department: {
        type: String,
    },
    specialization: {
        type: String,
    }
});

const UserDetails = mongoose.model<UserDetailsDoc>('UserDetails', userDetailsSchema);
// // const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
// // const User = mongoose.model('User', userSchema);
export {UserDetails};
