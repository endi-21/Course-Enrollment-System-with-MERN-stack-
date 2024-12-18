import express from "express";
import { getAllUsers, getUserById, getUsersByName, createUser, loginUser, updateUser, deleteUser, getStudentsByCourseId } from "../controllers/user.controller.js";
import {protect} from "../middlewares/auth.js"; 

const router = express.Router(); 

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/search/:name", getUsersByName);
router.post("/", createUser); 
router.post("/login", loginUser);
router.get("/course/:courseId", getStudentsByCourseId);

//protect middleware
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router; 