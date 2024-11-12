import express from "express";
import { getUserByName, createUser, loginUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import {protect} from "../middlewares/auth.js"; 

const router = express.Router(); 

router.get("/:name", getUserByName);
router.post("/", createUser); 
router.post("/login", loginUser);

//protect middleware
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router; 