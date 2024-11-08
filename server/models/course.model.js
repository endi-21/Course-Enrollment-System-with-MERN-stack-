import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		instructor_id: {
			type: mongoose.Schema.Types.ObjectId, // reference to the User model
			ref: "User", 
			required: true,
		},
        student_ids: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
        }],
		video_url: {
			type: String,
			required: true,
		},
        
	},
	{
		timestamps: true, // creation and update time
	}
);

const Course = mongoose.model("Course", courseSchema);
						    //model name 
export default Course;