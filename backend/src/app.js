import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// importing all the routes
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";

// using all the imported routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

export default app;
