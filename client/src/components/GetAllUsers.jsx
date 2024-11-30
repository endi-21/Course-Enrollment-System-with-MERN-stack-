import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './UI/UserCard';

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const token = JSON.parse(localStorage.getItem('user'))?.data?.token;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setUsers(response.data.data);
                } else {
                    setError('Failed to fetch users');
                }
            } catch (err) {
                setError(err.message || 'An error occurred');
            }
        };

        fetchUsers();
    }, [token]);

    if (error) return <p>Error: {error}</p>;
    if (!users.length) return <p>Loading...</p>;

    return (
        <div>
            <h2>All Users</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {users.map((user) => (
                    <UserCard key={user._id} userData={user} />
                ))}
            </div>
        </div>
    );
};

export default GetAllUsers;
