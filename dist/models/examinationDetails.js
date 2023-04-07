"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Examination = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ExaminationSchema = new mongoose_1.default.Schema({
    Class: {
        type: String,
        required: true
    },
    // Schedule: {
    //     type: 
    //     Array,
    //     "default" : [],
    // [{
    date: { type: Date, required: true },
    day: { type: String, required: true },
    subject: { type: String, required: true },
    // }],
    // required: true
    // }
});
const Examination = mongoose_1.default.model('Examination', ExaminationSchema);
exports.Examination = Examination;
