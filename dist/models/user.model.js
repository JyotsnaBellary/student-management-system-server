"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
