import express from "express";
import { getCourseByTitle, createCourse, updateCourse, deleteCourse } from "../controllers/course.controller.js";

const router = express.Router(); 

router.get("/:title", getCourseByTitle);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse); 

export default router; 