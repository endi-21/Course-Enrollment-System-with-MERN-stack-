import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/user.route.js";

dotenv.config(); 

const app = express(); 

app.use(express.json());  //to get JSON data in req.body

app.use("/api/users", userRoutes); 


console.log(process.env.MONGO_URI); 


app.listen(5000, async () => {
    await connectDB()
    console.log("Port 5000")
})