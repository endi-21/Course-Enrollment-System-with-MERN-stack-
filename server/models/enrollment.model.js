import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User", // Reference to the User model
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Course", // Reference to the Course model
        },
        start_date: {
            type: Date,
            required: true,
        },
        end_date: {
            type: Date,  // when students finishes the course 
        },
    },
    
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
