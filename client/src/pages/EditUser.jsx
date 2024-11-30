import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
	const navigate = useNavigate();
	const { logout } = useLogout();
	const location = useLocation();
	const { userId } = location.state || {};
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		profilePic: '',
		description: '',
		password: '',
	});

	const handleDeleteUser = async () => {
		try {
			await axios.delete(`http://localhost:5000/api/users/${userId}`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.data?.token}`,
				},
			});

			logout();

			navigate('/login');
			alert('User deleted successfully!');
		} catch (error) {
			console.error('Error deleting user:', error);
			alert('Failed to delete user. Please try again.');
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
				if (response.data.success) {
					const { name, email, profilePic, description } = response.data.data;
					setFormData({
						name,
						email,
						profilePic,
						description: description || '',
						password: '',
					});
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUserData();
	}, [userId]);

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
			await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.data?.token}`,
				},
			});

			localStorage.removeItem('user');

			const loginResponse = await axios.post('http://localhost:5000/api/users/login', {
				email: formData.email,
				password: formData.password,
			});

			if (loginResponse.data.success) {
				localStorage.setItem('user', JSON.stringify(loginResponse.data));
				alert('User updated successfully!');
			}
		} catch (error) {
			console.error('Error updating user:', error);
		}
	};

	return (
		<div>
			<h2>Edit User</h2>
			<form onSubmit={handleSubmit}>

				<label>
					Name:
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</label> <br />

				<label>
					Email:
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</label> <br />

				<label>
					Profile Picture URL:
					<input
						type="url"
						name="profilePic"
						value={formData.profilePic}
						onChange={handleChange}
					/>
				</label> <br />

				<label>
					Description:
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</label> <br />

				<label>
					Password:
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</label> <br /> <br />

				<button type="submit">Update User</button>

			</form>
			<button onClick={handleDeleteUser}>Delete User</button>
		</div>

	);
};

export default EditUser;
