"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const holidays_router_1 = __importDefault(require("./routes/holidays.router"));
const invigilation_router_1 = __importDefault(require("./routes/invigilation.router"));
const examination_router_1 = __importDefault(require("./routes/examination.router"));
const userDetails_router_1 = __importDefault(require("./routes/userDetails.router"));
const library_router_1 = __importDefault(require("./routes/library.router"));
const app = (0, express_1.default)();
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(body_parser_1.default.json()); // application/json
app.use(auth_router_1.default);
app.use('/teacher', holidays_router_1.default);
app.use('/student', holidays_router_1.default);
app.use('/teacher', invigilation_router_1.default);
app.use('/student', examination_router_1.default);
app.use('/teacher', userDetails_router_1.default);
app.use('/student', userDetails_router_1.default);
app.use('/library', library_router_1.default);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use((err, req, res, next) => {
    // res.json({
    //     message : error.message || "an unkwown error",
    // });
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "an unkwown error";
    // const data = error.data;
    res.status(statusCode).json({ message: message });
    // next();
});
mongoose_1.default
    .connect("mongodb://0.0.0.0:27017/StudentManagementSystem")
    .then(result => {
    console.log("success");
    app.listen(8880);
})
    .catch(err => console.log(err));
