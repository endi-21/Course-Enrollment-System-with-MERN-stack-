import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEnrollment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { enrollmentId } = location.state || {}; 
    const [formData, setFormData] = useState({
        student_id: '',
        course_id: '',
        start_date: '',
        end_date: '',
    });

    useEffect(() => {
        const fetchEnrollment = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/enrollments/${enrollmentId}`, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.data?.token}`,
                    },
                });

                if (response.data.success) {
                    const { student_id, course_id, start_date, end_date } = response.data.data;
                    setFormData({
                        student_id,
                        course_id,
                        start_date: new Date(start_date).toISOString().substring(0, 10), 
                        end_date: end_date ? new Date(end_date).toISOString().substring(0, 10) : '', 
                    });
                }
            } catch (error) {
                console.error('Error fetching enrollment:', error);
            }
        };

        fetchEnrollment();
    }, [enrollmentId]);

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
            await axios.put(`http://localhost:5000/api/enrollments/${enrollmentId}`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.data?.token}`,
                },
            });

            alert('Enrollment updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating enrollment:', error);
            alert('Failed to update enrollment. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/enrollments/${enrollmentId}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.data?.token}`,
                },
            });

            alert('Enrollment deleted successfully!');
            navigate('/'); 
        } catch (error) {
            console.error('Error deleting enrollment:', error);
            alert('Failed to delete enrollment. Please try again.');
        }
    };

    return (
        <div>
            <h2>Edit Enrollment</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Student ID:
                    <input
                        type="text"
                        name="student_id"
                        value={formData.student_id}
                        onChange={handleChange}
                        required
                    />
                </label> <br />

                <label>
                    Course ID:
                    <input
                        type="text"
                        name="course_id"
                        value={formData.course_id}
                        onChange={handleChange}
                        required
                    />
                </label> <br />

                <label>
                    Start Date:
                    <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                    />
                </label> <br />

                <label>
                    End Date:
                    <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                    />
                </label> <br /> <br />

                <button type="submit">Update Enrollment</button>
            </form>
            <br />
            <button onClick={handleDelete}>
                Delete Enrollment
            </button>
        </div>
    );
};

export default EditEnrollment;