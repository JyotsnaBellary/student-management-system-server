"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leave = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const leaveSchema = new mongoose_1.default.Schema({
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
    fromDate: { type: Date,
        required: true
    },
    toDate: { type: Date,
        required: true
    },
    reason: { type: String,
        required: true
    },
    status: { type: String,
        required: true
    }
});
const Leave = mongoose_1.default.model('Leave', leaveSchema);
exports.Leave = Leave;
