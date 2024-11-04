import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import User from "./models/user.model.js";

dotenv.config(); 

const app = express(); 

app.use(express.json());  //to get JSON data in req.body

app.post("/api/users", async (req, res) => {
    const user = req.body;

    if(!user.name || !user.email || !user.password || !user.role){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    const newUser = new User(user);

    try{
        await newUser.save(); //mongoose function to save data to db 
        return res.status(201).json({success: true, data: newUser});
    } catch(error){
        console.log("Error:", error.message);
        return res.status(500).json({success: false, message: "Server error"}) 
    }
});


console.log(process.env.MONGO_URI); 


app.listen(5000, async () => {
    await connectDB()
    console.log("Port 5000")
})