import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id, 
            name: user.name,
            email: user.email,
            role: user.role,
            profilePic: user.profilePic,
            description: user.description
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // expires in 1 day
    );
};
