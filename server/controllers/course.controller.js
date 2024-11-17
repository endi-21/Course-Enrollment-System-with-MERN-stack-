import mongoose from "mongoose";
import Course from "../models/course.model.js"

const checkCourseFields = (course) => {
    return (!course.title || !course.description || !course.instructor_id || !course.video_url);
}

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        return res.status(200).json({success: true, data: courses});
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getCourseById = async (req, res) => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Please provide the ID" });
    }

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        return res.status(200).json({success: true, data: course})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
};

export const getCoursesByTitle = async (req, res) => {
    const {title} = req.params;

    if (!title) {
        return res.status(400).json({ success: false, message: "Please provide a title" });
    }

    try {
        const courses = await Course.find({title});
        
        if (courses.length === 0) {
            return res.status(404).json({ success: false, message: "No courses found" });
        }

        return res.status(200).json({success: true, data: courses})
    } catch (error) {
        console.log("Fetching error:", error.message);
        return res.status(500).json({success: false, message: "Server error"});
    }
};

export const createCourse = async (req, res) => {
    const course = req.body;

    if(checkCourseFields(course)){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    const newCourse = new Course(course); 

    try {
        await newCourse.save();
        return res.status(201).json({success: true, data: newCourse});
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"});
    }
};

export const updateCourse = async (req, res) => {
    const {id} = req.params;
    const course = req.body;

    if(checkCourseFields(course)){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Id" });
    }
    
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, course, {new: true}); 
        return res.status(200).json({success: true, data: updatedCourse});
    } catch (error) {
        res.status(200).json({ success: false, message: "Server error" });
    }
};

export const deleteCourse = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Id" });
	}

    try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        return res.status(200).json({ success: true, message: "Course deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getCoursesByInstructor = async (req, res) => {
    const { instructorId } = req.params;

    try {
        const courses = await Course.find({ instructor_id: instructorId });

        if (courses.length === 0) {
            return res.status(404).json({ success: false, message: "No courses found for this instructor" });
        }

        return res.status(200).json({ success: true, data: courses });
    } catch (error) {
        console.error("Error fetching courses:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};