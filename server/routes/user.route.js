import express from "express";
import { getUserByName, createUser, updateUser, deleteUser } from "../controllers/user.controller.js"

const router = express.Router(); 

router.get("/:name", getUserByName);
router.post("/", createUser); 
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router; 