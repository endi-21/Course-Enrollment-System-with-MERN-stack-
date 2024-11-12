import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; //splits that string and extracts the actual token

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Not authorized, token invalid" });
    }
};
