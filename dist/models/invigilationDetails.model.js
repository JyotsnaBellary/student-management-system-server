"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invigilation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const invigilationSchema = new mongoose_1.default.Schema({
    teacherId: {
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
    day: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
});
const Invigilation = mongoose_1.default.model('Invigilation', invigilationSchema);
exports.Invigilation = Invigilation;
