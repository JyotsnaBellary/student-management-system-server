"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentDetails = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const parentDetailsSchema = new mongoose_1.default.Schema({
    parentId: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
    },
    phonesNumberOfFather: {
        type: String,
    },
    emailOfFather: {
        type: String,
    },
    motherName: {
        type: String,
    },
    phonesNumberOfMother: {
        type: String,
    },
    emailOfMother: {
        type: String,
    }
});
const ParentDetails = mongoose_1.default.model('ParentDetails', parentDetailsSchema);
exports.ParentDetails = ParentDetails;
