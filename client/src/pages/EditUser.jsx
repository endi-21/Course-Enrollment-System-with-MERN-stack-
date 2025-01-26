import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const EditUser = () => {
	const loggedUser = useAuthContext()
	const { dispatch } = useAuthContext();
	const location = useLocation();
	const navigate = useNavigate();
	const { logout } = useLogout();
	const { user } = location.state || {};
	const token = localStorage.getItem("authToken");
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		profilePic: '',
		description: '',
		password: '',
	});

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name,
				email: user.email,
				profilePic: user.profilePic,
				description: user.description || '',
				password: '',
			});
		}
	}, [user]);

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
			await axios.put(`http://localhost:5000/api/users/${user.id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (loggedUser?.role !== 'admin') {
				const updatedUser = { ...user, ...formData };
				dispatch({ type: 'LOGIN', payload: updatedUser });
			}

			alert('User updated successfully!');
			navigate('/');
		} catch (error) {
			console.error('Error updating user:', error);
			alert('Failed to update user. Please try again.');
		}
	};

	const handleDeleteUser = async () => {
		try {
			await axios.delete(`http://localhost:5000/api/users/${user.id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			alert('User deleted successfully!');

			if (loggedUser?.role !== 'admin') {
				logout();
			}
			navigate('/'); 
		} catch (error) {
			console.error('Error deleting user:', error);
			alert('Failed to delete user. Please try again.');
		}
	};


	return (
		<div>
			<h2>Edit User</h2>

			<p>ID: {user.id}</p>

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