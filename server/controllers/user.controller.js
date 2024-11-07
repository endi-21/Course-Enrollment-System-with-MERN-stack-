import mongoose from 'mongoose';
import User from "../models/user.model.js";


export const createUser = async (req, res) => {
    const user = req.body;

    if(!user.name || !user.email || !user.password || !user.role){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }
    if(user.role != "student" || user.role != "instructor"){
        return res.status(400).json({success: false, message: "Role invalid"});
    }

    const newUser = new User(user);

    try{
        await newUser.save(); //mongoose function to save data to db 
        return res.status(201).json({success: true, data: newUser});
    } catch(error){
        console.log("Error:", error.message);
        return res.status(500).json({success: false, message: "Server error"}) 
    }
};
