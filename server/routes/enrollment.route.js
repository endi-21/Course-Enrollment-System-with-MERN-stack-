import express from "express";
import { getEnrollmentById, createEnrollment } from "../controllers/enrollment.controller.js";

const router = express.Router();

router.get("/:id", getEnrollmentById);
router.post("/", createEnrollment); 

export default router;