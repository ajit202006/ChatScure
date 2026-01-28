import express from "express";

import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = 3000;

app.use("/",(req,res)=>{
    res.send("This is chatscure application");
})

app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log("Server running on port "+PORT);
})