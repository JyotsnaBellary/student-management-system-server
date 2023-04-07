"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BookSchema = new mongoose_1.default.Schema({
    bookId: { type: String,
        required: true
    },
    bookName: { type: String,
        required: true
    },
    imagePath: { type: String,
        required: true
    },
    author: { type: String,
        required: true
    },
    gist: { type: String,
        required: true
    },
    status: { type: String,
        required: true
    },
    quantity: { type: Number,
        required: true
    },
    available: { type: Boolean,
        required: true
    },
    nextAvailableDate: { type: Date }
});
const Book = mongoose_1.default.model('Book', BookSchema);
exports.Book = Book;
