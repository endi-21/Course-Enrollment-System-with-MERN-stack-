import express from "express";
import { getAllCourses, getCourseById, getCoursesByTitle, createCourse, updateCourse, deleteCourse, getCoursesByInstructor } from "../controllers/course.controller.js";
import {protect} from "../middlewares/auth.js"; 

const router = express.Router(); 

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.get("/search/:title", getCoursesByTitle);
router.get("/instructor/:instructorId", getCoursesByInstructor);

//protect middleware
router.post("/", protect, createCourse);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse); 

export default router; 