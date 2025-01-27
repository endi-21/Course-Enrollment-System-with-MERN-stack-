import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from "@mui/material/Button";

const UserProfile = () => {
    const navigate = useNavigate();

    const { user } = useAuthContext()

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Profile Picture:</strong></p>
            <img src={user.profilePic} alt="Profile" width="150" />
            <p><strong>Description:</strong> {user.description || 'No description provided.'}</p>

            <Button className='purple' variant="contained" onClick={() => navigate('/edit-user', { state: { user } })}>
                Edit
            </Button>
        </div>
    );
};

export default UserProfile;
