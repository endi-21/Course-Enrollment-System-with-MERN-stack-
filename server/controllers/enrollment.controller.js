import mongoose from "mongoose";
import Enrollment from "../models/enrollment.model.js";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";

export const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({});
        return res.status(200).json({success: true, data: enrollments});
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getEnrollmentById = async (req, res)=> {
    const {id} = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Please provide a valid ID" });
    }

    try {
        const enrollment = await Enrollment.findById(id)
            .populate("course") 
            .populate("student"); 

        if (!enrollment) {
            return res.status(404).json({ success: false, message: "No enrollment found" });
        }

        return res.status(200).json({success: true, data: enrollment});
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
};

export const createEnrollment = async (req, res) => {
    const {student, course} = req.body;

    if(!student || !course){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    try {

        const student = await User.findById(student);
        if(student.role !== "student"){
            return res.status(400).json({success: false, message: "User is not a student"})
        }

        const studentExists = await User.findById(student);
        if(!studentExists){
            return res.status(404).json({success: false, message: "Student not found"});
        }

        const courseExists = await Course.findById(course);
        if(!courseExists){
            return res.status(404).json({success: false, message: "Course not found"});
        }

        const enrollmentExists = await Enrollment.findOne({student, course});
        if(enrollmentExists){
            return res.status(409).json({success: false, message: "Enrollment already exists"})
        }

        const enrollment = new Enrollment({...req.body, start_date: new Date()})

        await enrollment.save();
        return res.status(201).json({success: true, data: enrollment})

    } catch (error) {
        console.error("Error creating enrollment:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateEnrollment = async (req, res) => {
    const {id} = req.params;
    const enrollment = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Id" });
    }
    
    try {
        const student = await User.findById(enrollment.student);
        if(student.role !== "student"){
            return res.status(400).json({success: false, message: "User is not a student"})
        }

        const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, enrollment, {new: true}); 
        return res.status(200).json({success: true, data: updatedEnrollment});
    } catch (error) {
        console.error("Error creating enrollment:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteEnrollment = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Fetching error:", error.message);
		return res.status(404).json({ success: false, message: "Invalid Id" });
	}

    try {
        const deletedEnrollment = await Enrollment.findByIdAndDelete(id);
        if (!deletedEnrollment) {
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }        
        return res.status(200).json({ success: true, message: "Enrollment deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getEnrollmentByStudentAndCourseId = async (req, res) => {
    const { studentId, courseId } = req.params;

    try {
        
        const enrollment = await Enrollment.findOne({ student: studentId, course: courseId })
            .populate("course") 
            .populate("student");

        if (!enrollment) {
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }

        res.status(200).json({ success: true, data: enrollment });
    } catch (error) {
        console.error("Error fetching enrollment:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const setEnrollmentEndDate = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const enrollment = await Enrollment.findById(id)
            .populate("course") 
            .populate("student");

        if (!enrollment) {
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }

        if (enrollment.end_date) {
            return res.status(400).json({ success: false, message: "End date is already set" });
        }

        enrollment.end_date = new Date();
        await enrollment.save();

        return res.status(200).json({ success: true, data: enrollment });
    } catch (error) {
        console.error("Error setting end_date:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};