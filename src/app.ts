import dotenv from 'dotenv';
import './config/passport';
import express, { Express, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import openAiRoute from './routes/openai';
import authRoute from './routes/auth';
import writingRoute from './routes/writing';
import usersRoute from './routes/users';
import errorHandler from './error/errorHandler';

const app: Express = express();
dotenv.config();
mongoose.set('strictQuery', false);

// const PORT: string | number = process.env.PORT || 8800;
const MONGO_URL = process.env.MONGO as string | undefined;
const JWT_TOKEN = process.env.JWT as string;

const connect = async () => {
  await mongoose.connect(`${MONGO_URL}`);
  console.log('Connected to mongoDB.');
};
// middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ['https://copydeck.grayshapes.co', 'http://localhost:3001'],
  })
);

app.use(
  session({ secret: JWT_TOKEN, resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/status', (req, res) => {
  res.json('We up! 🚀');
});

app.use('/writing', openAiRoute);
app.use('/story', writingRoute);
app.use('/auth', authRoute);
app.use('/users', usersRoute);

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.use(errorHandler);

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log('Connected to backend.');
});
