import express from 'express';
//import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);


app.listen(port, () => { 
  connectDb();
  console.log(`Server is running at http://localhost:${port}`);
})