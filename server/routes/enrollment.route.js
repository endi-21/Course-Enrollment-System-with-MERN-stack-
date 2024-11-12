import express from "express";
import { getEnrollmentById, createEnrollment } from "../controllers/enrollment.controller.js";
import {protect} from "../middlewares/auth.js"; 

const router = express.Router();

router.get("/:id", getEnrollmentById);
router.post("/", protect, createEnrollment); //protect middleware

export default router;