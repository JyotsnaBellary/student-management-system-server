"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const librarySchema = new mongoose_1.default.Schema({
    bookId: { type: String,
        required: true
    },
    userId: { type: String,
        required: true
    },
    borrowedDate: { type: Date,
        required: true
    },
    returnDate: { type: String,
        required: true
    }
});
const Library = mongoose_1.default.model('Library', librarySchema);
exports.Library = Library;
