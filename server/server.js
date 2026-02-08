import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-auth-xv8l.vercel.app"
    ],
    credentials: true,
  })
);


app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is live 🚀");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

connectDB();


export default app;
