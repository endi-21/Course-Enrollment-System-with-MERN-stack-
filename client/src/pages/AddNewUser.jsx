import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddNewUser = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		role: '',
		description: '',
		profilePic: '',
	});

	const user = JSON.parse(localStorage.getItem('user'));
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:5000/api/users', formData, {
				headers: {
					Authorization: `Bearer ${user?.data?.token}`,
				},
			});

			if (response.data.success) {
				alert('User added successfully!');
				navigate('/AdminDashboard'); 
			}
		} catch (error) {
			console.error('Error adding user:', error);
			alert('Failed to add user. Please try again.');
		}
	};

	return (
		<div>
			<form className="add-user" onSubmit={handleSubmit}>
				<h3>Add New User</h3>

				<label>Name:</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
				/> <br />

				<label>Email:</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
				/> <br />

				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					required
				/> <br />

				<label>Role:</label>
				<input
					type="radio"
					name="role"
					value="student"
					checked={formData.role === 'student'}
					onChange={handleChange}
				/> Student
				<input
					type="radio"
					name="role"
					value="instructor"
					checked={formData.role === 'instructor'}
					onChange={handleChange}
				/> Instructor
				<br />

				<label>Description:</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
				></textarea> <br />

				<label>Profile Picture URL:</label>
				<input
					type="url"
					name="profilePic"
					value={formData.profilePic}
					onChange={handleChange}
				/> <br />

				<button type="submit">Add User</button>
			</form>

		</div>
	);
};

export default AddNewUser;
