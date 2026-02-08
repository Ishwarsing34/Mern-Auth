import dns from 'dns'

dns.setServers([
    "8.8.8.8",
    "8.8.4.4",
    "1.1.1.1"
]);



import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin:allowedOrigins,
    credentials: true }));

app.get('/', (req,res)=>{
    res.send("server is live BROO" )
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


connectDB();

app.listen(port, () =>
  console.log(`Server started on PORT:${port}`)
);
