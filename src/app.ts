import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import openAiRoute from "./routes/openai";
import authRoute from "./routes/auth";
import writingRoute from "./routes/writing";
import usersRoute from "./routes/users";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();
dotenv.config();
mongoose.set("strictQuery", false);

// const PORT: string | number = process.env.PORT || 8800;
const MONGO_URL: string | undefined = process.env.MONGO;

const connect = async () => {
  try {
    await mongoose.connect(`${MONGO_URL}`);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://copydeck.grayshapes.co/", "http://localhost:3001"],
  })
);

app.get('/status', (req, res) => {
  res.json('We up! 🚀');
});

app.use("/writing", openAiRoute);
app.use("/story", writingRoute);
app.use("/auth", authRoute);
app.use("/users", usersRoute);

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log("Connected to backend.");
});
