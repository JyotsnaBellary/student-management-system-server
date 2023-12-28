import mongoose from "mongoose";

interface ParentDetailsAttrs {
    parentId: string,
    fatherName: string,
    phonesNumberOfFather: string,
    emailOfFather: string,
    motherName: string,
    phonesNumberOfMother: string,
    emailOfMother: string,
}

interface ParentDetailsDoc extends mongoose.Document {
    parentId: string,
    fatherName: string,
    phonesNumberOfFather: string,
    emailOfFather: string,
    motherName: string,
    phonesNumberOfMother: string,
    emailOfMother: string,
}

const parentDetailsSchema = new mongoose.Schema({
    parentId: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
    },
    phonesNumberOfFather: {
        type: String,
    },
    emailOfFather: {
        type: String,
    },
    motherName: {
        type: String,
    },
    phonesNumberOfMother: {
        type: String,
    },
    emailOfMother: {
        type: String,
    }
});

const ParentDetails = mongoose.model<ParentDetailsDoc>('ParentDetails', parentDetailsSchema);
// // const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
// // const User = mongoose.model('User', userSchema);
export {ParentDetails};
