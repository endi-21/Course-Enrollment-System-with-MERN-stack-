import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

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
		<div className='form'>
			<h2>Edit User</h2>

			<form onSubmit={handleSubmit}>
				<TextField className="textfield"
					id="name" label="Name" variant="standard" name="name"
					value={formData.name} onChange={handleChange} required fullWidth margin="normal"
				/>

				<TextField className="textfield"
					id="email" label="Email" variant="standard" name="email"
					value={formData.email} onChange={handleChange} required fullWidth margin="normal"
				/>
				<TextField className="textfield"
                    id="profilePic" label="Profile Picture URL" variant="standard" name="profilePic" type="url"
                    value={formData.profilePic} onChange={handleChange} fullWidth margin="normal"
                />
				
				<TextField className="textfield"
                    id="description" label="Description" variant="standard" name="description"
                    value={formData.description} onChange={handleChange} required fullWidth margin="normal"
                />
				<TextField className="textfield"
                    id="password" label="Password" type="password" variant="standard" name="password" 
                    value={formData.password} onChange={handleChange} required fullWidth margin="normal"
                />
				<Button className='purple' variant="contained" type="submit">Update User</Button>
			</form>
			<Button variant="outlined" startIcon={<DeleteIcon />} color="error" onClick={handleDeleteUser} >
                Delete User
            </Button>
		</div>

	);
};

export default EditUser;