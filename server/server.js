import dns from "dns";

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
  "1.1.1.1",
]);

import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-auth-xv8l.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is live 🚀");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// 404 fallback (SAFE VERSION)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
