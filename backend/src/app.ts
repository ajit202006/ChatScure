import express from "express";

const app = express();
const PORT = 3000;

app.use('/',(req,res)=>{
    res.send("This is chatscure application");
})

app.listen(PORT,()=>{
    console.log("Server running on port "+PORT);
})