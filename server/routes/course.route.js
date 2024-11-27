import express from "express";
import { getAllCourses, getCourseById, getCoursesByTitle, createCourse, updateCourse, deleteCourse, getCoursesByInstructorId, getCoursesByStudentId, getCoursesNotEnrolledByStudentId } from "../controllers/course.controller.js";
import {protect} from "../middlewares/auth.js"; 

const router = express.Router(); 

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.get("/search/:title", getCoursesByTitle);
router.get("/instructor/:instructorId", getCoursesByInstructorId);

//protect middleware
router.post("/", protect, createCourse);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse); 
router.get("/student/:studentId", protect, getCoursesByStudentId);
router.get("/student/not-enrolled/:studentId", protect, getCoursesNotEnrolledByStudentId); 

export default router; 