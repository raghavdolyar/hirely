import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

// importing all the routes
import authRouter from './routes/auth.routes.js';

// using all the imported routes
app.use('/api/auth', authRouter);

export default app;
