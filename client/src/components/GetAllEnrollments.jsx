import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EnrollmentCard from './UI/EnrollmentCard';

const GetAllEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [error, setError] = useState(null);

    const token = JSON.parse(localStorage.getItem('user'))?.data?.token;

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/enrollments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setEnrollments(response.data.data);
                } else {
                    setError('Failed to fetch enrollments');
                }
            } catch (err) {
                setError(err.message || 'An error occurred');
            }
        };

        fetchEnrollments();
    }, [token]);

    if (error) return <p>Error: {error}</p>;
    if (!enrollments.length) return <p>Loading...</p>;

    return (
        <div>
            <h2>All Enrollments</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {enrollments.map((enrollment) => (
                    <EnrollmentCard key={enrollment._id} enrollmentData={enrollment} />
                ))}
            </div>
        </div>
    );
};

export default GetAllEnrollments;
