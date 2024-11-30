import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userId = JSON.parse(localStorage.getItem('user'))?.data?.user?._id;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                if (response.data.success) {
                    setUserData(response.data.data);
                } else {
                    setError('Failed to fetch user data');
                }
            } catch (err) {
                setError(err.message || 'An error occurred');
            }
        };

        fetchUserData();
    }, [userId]);

    if (error) return <p>Error: {error}</p>;
    if (!userData) return <p>Loading...</p>;

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>ID:</strong> {userData._id}</p>
            <p><strong>Role:</strong> {userData.role}</p>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Profile Picture:</strong></p>
            <img src={userData.profilePic} alt="Profile" width="150" />
            <p><strong>Description:</strong> {userData.description || 'No description provided.'}</p>

            <button onClick={() => navigate('/edit-user', { state: { userId: userData._id } })}>
                Edit
            </button>
        </div>
    );
};

export default UserProfile;
