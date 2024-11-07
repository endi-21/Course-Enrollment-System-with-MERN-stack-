import mongoose from 'mongoose';
import User from "../models/user.model.js";

export const getUserByName = async (req, res) => {
    const {name} = req.params;

    if (!name) {
        return res.status(400).json({ success: false, message: "Please provide an name" });
    }

    try {
        const users = await User.find({name});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("Fetching error: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createUser = async (req, res) => {
    const user = req.body;

    if (!user.name || !user.email || !user.password || !user.role) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    if (user.role != "student" && user.role != "instructor") {
        return res.status(400).json({ success: false, message: "Role invalid" });
    }

    const newUser = new User(user);

    try {
        await newUser.save(); //mongoose function to save data to db 
        return res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.log("Error:", error.message);
        return res.status(500).json({ success: false, message: "Server error" })
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;

    if (user.role != "student" && user.role != "instructor") {
        return res.status(400).json({ success: false, message: "Role must be either 'student' or 'instructor'" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Id" });
    }

    try {
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
		await User.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "User deleted" });
	} catch (error) {
		console.log("Error in deleting user:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};