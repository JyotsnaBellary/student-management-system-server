"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetails = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userDetailsSchema = new mongoose_1.default.Schema({
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
const UserDetails = mongoose_1.default.model('UserDetails', userDetailsSchema);
exports.UserDetails = UserDetails;
