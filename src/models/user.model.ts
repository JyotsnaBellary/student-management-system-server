import mongoose from "mongoose";

interface UserAttrs {
    email: String,
    password: string,
    role: string,
    userId: string
}
// interface UserModel extends mongoose.Model<UserDoc> {
//     build(attrs: UserAttrs): UserDoc
// }

interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
    role: string,
    userId: string
}
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});
// userSchema.statics.build = (attrs: UserAttrs) => {
//     return new User(attrs)
// }
const User = mongoose.model<UserDoc>('User', userSchema);
// const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
// const User = mongoose.model('User', userSchema);
export {User};
