"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Holiday = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const holidaySchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    holiday: {
        type: String,
        required: true
    },
});
const Holiday = mongoose_1.default.model('Holiday', holidaySchema);
exports.Holiday = Holiday;
