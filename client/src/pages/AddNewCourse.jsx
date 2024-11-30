import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddNewCourse = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video_url: '',
        instructor_id: '', 
    });

    const user = JSON.parse(localStorage.getItem('user'));
    const role = user?.data?.user?.role; 
    const instructorId = role === 'instructor' ? user?.data?.user?._id : ''; 
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

        const payload = {
            ...formData,
            instructor_id: role === 'instructor' ? instructorId : formData.instructor_id, 
        };

        try {
            const response = await axios.post('http://localhost:5000/api/courses', payload, {
                headers: {
                    Authorization: `Bearer ${user?.data?.token}`,
                },
            });

            if (response.data.success) {
                alert('Course added successfully!');
                navigate('/Instructordashboard'); 
            }
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Failed to add course. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Course</h2>

            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </label> <br />

            <label>
                Description:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </label> <br />

            <label>
                Video URL:
                <input
                    type="url"
                    name="video_url"
                    value={formData.video_url}
                    onChange={handleChange}
                    required
                />
            </label> <br />

            {role === 'admin' && (
                <label>
                    Instructor ID:
                    <input
                        type="text"
                        name="instructor_id"
                        value={formData.instructor_id}
                        onChange={handleChange}
                        required
                    />
                </label>
            )}

            <br /> <br />
            <button type="submit">Add Course</button>
        </form>
    );
};

export default AddNewCourse;
