import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { Error } from './models/interfaces/error';
import authRoutes  from './routes/auth.router';
import holidayRoutes from './routes/holidays.router';
import invigilationRoutes from './routes/invigilation.router'
import examinationRoutes from './routes/examination.router'
import userDetailsRoutes from './routes/userDetails.router'
import libraryRoutes from './routes/library.router'
const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use(authRoutes);
app.use('/teacher',holidayRoutes);
app.use('/student',holidayRoutes);
app.use('/teacher',invigilationRoutes);
app.use('/student',examinationRoutes);
app.use('/teacher',userDetailsRoutes);
app.use('/student',userDetailsRoutes);
app.use('/library', libraryRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

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

mongoose
  .connect(
    "mongodb://0.0.0.0:27017/StudentManagementSystem"
  )
  .then(result => {
    console.log("success")
    app.listen(8880);

  })
  .catch(err => console.log(err));
