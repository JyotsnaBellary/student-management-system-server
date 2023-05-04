"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const mongoose_config_1 = require("./mongoose-config");
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const holidays_router_1 = __importDefault(require("./routes/holidays.router"));
const invigilation_router_1 = __importDefault(require("./routes/invigilation.router"));
const examination_router_1 = __importDefault(require("./routes/examination.router"));
const userDetails_router_1 = __importDefault(require("./routes/userDetails.router"));
const library_router_1 = __importDefault(require("./routes/library.router"));
const leave_router_1 = __importDefault(require("./routes/leave.router"));
const attendance_router_1 = __importDefault(require("./routes/attendance.router"));
const schedule_router_1 = __importDefault(require("./routes/schedule.router"));
const app = (0, express_1.default)();
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(body_parser_1.default.json()); // application/json
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
app.use(auth_router_1.default);
app.use(holidays_router_1.default);
app.use(invigilation_router_1.default);
app.use(examination_router_1.default);
app.use(userDetails_router_1.default);
app.use(library_router_1.default);
app.use(leave_router_1.default);
app.use(attendance_router_1.default);
app.use(schedule_router_1.default);
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
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, mongoose_config_1.connect)().then(() => {
        console.log("success");
        app.listen(8880);
    })
        .catch((err) => console.log(err));
    ;
});
start();
