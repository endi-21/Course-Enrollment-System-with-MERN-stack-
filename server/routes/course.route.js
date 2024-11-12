import express from "express";
import { getCourseByTitle, createCourse, updateCourse, deleteCourse } from "../controllers/course.controller.js";
import {protect} from "../middlewares/auth.js"; 

const router = express.Router(); 

router.get("/:title", getCourseByTitle);

//protect middleware
router.post("/", protect, createCourse);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse); 

export default router; 