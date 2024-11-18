import express from "express";
import { getAllEnrollments, getEnrollmentById, createEnrollment, deleteEnrollment, updateEnrollment, getEnrollmentByStudentAndCourseId } from "../controllers/enrollment.controller.js";
import {protect} from "../middlewares/auth.js"; 

const router = express.Router();

router.get("/", getAllEnrollments);
router.get("/:id", getEnrollmentById);
router.get("/:studentId/:courseId", getEnrollmentByStudentAndCourseId);

//protect middleware
router.post("/", protect, createEnrollment); 
router.put("/:id", protect, updateEnrollment); 
router.delete("/:id", protect, deleteEnrollment); 

export default router;