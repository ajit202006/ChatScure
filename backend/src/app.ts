import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import connectDB from "./lib/db";

dotenv.config()
const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI

app.use("/",(req,res)=>{
    res.send("This is chatscure application");
})

app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log("Server running on port "+PORT);
    connectDB(MONGODB_URI||"");
})