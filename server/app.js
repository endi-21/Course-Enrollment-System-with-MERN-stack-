import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

dotenv.config(); 

const app = express(); 

console.log(process.env.MONGO_URI); 


app.listen(5000, () => {
    connectDB()
    console.log("Port 5000")
})