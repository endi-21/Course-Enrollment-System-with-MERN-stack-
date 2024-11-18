import express from "express";
import { getAllEnrollments, getEnrollmentById, createEnrollment, deleteEnrollment, updateEnrollment, getEnrollmentByStudentAndCourseId, setEnrollmentEndDate } from "../controllers/enrollment.controller.js";
import {protect} from "../middlewares/auth.js"; 

const router = express.Router();

router.get("/", getAllEnrollments);
router.get("/:id", getEnrollmentById);
router.get("/:studentId/:courseId", getEnrollmentByStudentAndCourseId);
router.put("/:id/end-date", setEnrollmentEndDate);

//protect middleware
router.post("/", protect, createEnrollment); 
router.put("/:id", protect, updateEnrollment); 
router.delete("/:id", protect, deleteEnrollment); 

export default router;