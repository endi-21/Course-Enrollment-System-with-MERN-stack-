import mongoose from 'mongoose';
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
import Enrollment from '../models/enrollment.model.js';

const checkUserFields = (user) => {
    return (!user.name || !user.email || !user.password || !user.role)
}

const checkUserRole = (user) => {
    return user.role != "student" && user.role != "instructor";
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({success: true, data: users});
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Please provide the ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid ID" });
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Fetching error:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getUsersByName = async (req, res) => {
    const {name} = req.params;

    if (!name) {
        return res.status(400).json({ success: false, message: "Please provide a name" });
    }

    try {
        const users = await User.find({name});

        if(users.length === 0){
            return res.status(404).json({success: false, message: "No users found"});
        }

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("Fetching error: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const createUser = async (req, res) => {
    const user = req.body;

    if (checkUserFields(user)) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    if (checkUserRole(user)) {
        return res.status(400).json({ success: false, message: "Role invalid" });
    }

    const newUser = new User(user);

    try {
        await newUser.save(); //mongoose function to save data to db 
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return res.status(201).json({ success: true, data: newUser, token });
    } catch (error) {
        console.log("Error:", error.message);
        return res.status(500).json({ success: false, message: "Server error" })
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = generateToken(user);
        res.status(200).json({ success: true, data: { user, token } });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Id" });
    }

    if ('role' in user) {
        return res.status(400).json({ success: false, message: "Users can't change roles" });
    }

    try {
        // Check if password is being updated
        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);  // Hash the new password
        }
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(200).json({ success: false, message: "Server error" });
    }
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Id" });
	}

	try {
		const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
		res.status(200).json({ success: true, message: "User deleted" });
	} catch (error) {
		console.log("Error in deleting user:", error.message);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export const getStudentsByCourseId = async (req, res) => {
    const { courseId } = req.params;

    try {
        const enrollments = await Enrollment.find({ course_id: courseId });

        if (enrollments.length === 0) {
            return res.status(404).json({ success: false, message: "No students found for this course" });
        }

        const studentIds = enrollments.map(enrollment => enrollment.student_id);

        const students = await User.find({ _id: { $in: studentIds } });

        res.status(200).json({ success: true, data: students });
    } catch (error) {
        console.error("Error fetching courses:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};