import mongoose from "mongoose";
import Enrollment from "../models/enrollment.model.js";

export const getEnrollmentById = async (req, res)=> {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Please provide an ID" });
    }

    try {
        const enrollment = await Enrollment.findById(id);
        return res.status(200).json({success: true, data: enrollment});
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
};

export const createEnrollment = async (req, res) => {
    const newEnrollemnt = new Enrollment(req.body);  

    try {
        await newEnrollemnt.save();
        return res.status(201).json({success: true, data: newEnrollemnt})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"})
    }
};
