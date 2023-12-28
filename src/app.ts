import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
const cors = require('cors')
import { connect } from './mongoose-config'
import { Error } from './models/interfaces/error';
import authRoutes  from './routes/auth.router';
import holidayRoutes from './routes/holidays.router';
import invigilationRoutes from './routes/invigilation.router'
import examinationRoutes from './routes/examination.router'
import userDetailsRoutes from './routes/userDetails.router'
import libraryRoutes from './routes/library.router'
import leaveRoutes from './routes/leave.router'
import attendanceRoutes from './routes/attendance.router'
import scheduleRoutes from './routes/schedule.router'
const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use(authRoutes);
app.use(holidayRoutes);
app.use(invigilationRoutes);
app.use(examinationRoutes);
app.use(userDetailsRoutes);
app.use(libraryRoutes);
app.use(leaveRoutes);
app.use(attendanceRoutes);
app.use(scheduleRoutes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // res.json({
    //     message : error.message || "an unkwown error",
    // });
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "an unkwown error";
    // const data = error.data;
    res.status(statusCode).json({ message: message});
    // next();
  });


  const start = async () => {
    connect().then(() => {
      console.log("success")
      app.listen(8880);
  
    })
    .catch((err: any) => console.log(err));;
  }
  
  start();
