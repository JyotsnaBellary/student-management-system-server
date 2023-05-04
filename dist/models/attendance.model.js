"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const attendanceSchema = new mongoose_1.default.Schema({
    userId: { type: String,
        required: true
    },
    firstName: { type: String,
        required: true
    },
    lastName: { type: String,
        required: true
    },
    Class: { type: String,
        required: true
    },
    section: { type: String,
        required: true
    },
    attendanceArray: { type: [],
        required: true
    }
});
const Attendance = mongoose_1.default.model('Attendance', attendanceSchema);
exports.Attendance = Attendance;
