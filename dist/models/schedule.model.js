"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ScheduleSchema = new mongoose_1.default.Schema({
    userId: {
        type: String
    },
    Class: {
        type: String,
    },
    section: {
        type: String,
    },
    specialization: {
        type: String,
    },
    Monday: { type: [],
        required: true
    },
    Tuesday: { type: [],
        required: true
    },
    Wednesday: { type: [],
        required: true
    },
    Thursday: { type: [],
        required: true
    },
    Friday: { type: [],
        required: true
    }
});
const Schedule = mongoose_1.default.model('Schedule', ScheduleSchema);
exports.Schedule = Schedule;
