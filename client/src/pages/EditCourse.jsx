import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const EditCourse = () => {
    const location = useLocation();
    const { course } = location.state || {};
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video_url: '',
    });

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!course) return;

        setFormData({
            title: course.title || '',
            description: course.description || '',
            video_url: course.video_url || '',
        });
    }, [course]);

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
            title: formData.title || '',
            description: formData.description || '',
            video_url: formData.video_url || '',
            instructor_id: course.instructor_id, 
        };

        try {
            const response = await axios.put(
                `http://localhost:5000/api/courses/${course._id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
                    },
                }
            );

            if (response.data.success) {
                alert('Course updated successfully!');
            } else {
                throw new Error(response.data.message || 'Failed to update course.');
            }
        } catch (error) {
            console.error('Error updating course:', error);
            alert(error.response?.data?.message || 'Failed to update course. Please try again.');
        }
    };

    if (!course) {
        return <p>No course data available.</p>;
    }

    return (
        <div>
            <h1>Edit Course</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </label>

                <label>
                    Video URL:
                    <input
                        type="url"
                        name="video_url"
                        value={formData.video_url}
                        onChange={handleChange}
                    />
                </label>

                <p><strong>Course ID:</strong> {course._id}</p>

                <button type="submit">Update Course</button>
            </form>
        </div>
    );
};

export default EditCourse;
