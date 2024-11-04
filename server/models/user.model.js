import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
		profilePic: {
			type: String, //url of a picture 
            default: null,
		},
	},
	{
		timestamps: true, // creation and update time
	}
);

const User = mongoose.model("User", userSchema);
						  //model name 
export default User;