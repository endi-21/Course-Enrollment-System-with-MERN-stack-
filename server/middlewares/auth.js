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

        if ( //if req is coming from neither admin nor the user who is owner, return 403
            req.user.role !== "admin" && req.params.id !== req.user.id &&
            (req.method === "POST" || req.method === "PUT" || req.method === "DELETE") &&
            (req.path.includes("/users/") || req.path.includes("/courses/") || req.path.includes("/enrollments/"))
        ) {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Not authorized, token invalid" });
    }
};
