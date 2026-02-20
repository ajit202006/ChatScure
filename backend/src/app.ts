import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/message.routes";
import connectDB from "./lib/db";

declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json({ limit:'10mb'}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.use("/", (req, res) => {
    res.send("This is chatscure application");
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
    connectDB(MONGODB_URI || "");
});