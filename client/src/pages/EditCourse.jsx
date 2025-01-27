import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const EditCourse = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { course } = location.state || {};
    const token = localStorage.getItem("authToken");
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video_url: '',
    });


    const handleDeleteCourse = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/courses/${course._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate('/');
            alert('Course deleted successfully!');
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Failed to delete course. Please try again.');
        }
    };

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
            instructor: course.instructor,
        };

        try {
            const response = await axios.put(
                `http://localhost:5000/api/courses/${course._id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                alert('Course updated successfully!');
                navigate('/Instructordashboard');
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
        <div className='edit-course'>
            <h1>Edit Course</h1>
            <form onSubmit={handleSubmit}>
                <TextField className="textfield"
                    id="title" label="Title" variant="standard" name="title"
                    value={formData.title} onChange={handleChange} required fullWidth margin="normal"
                />
                <TextField className="textfield"
                    id="description" label="Description" variant="standard" name="description" multiline maxRows={4}
                    value={formData.description} onChange={handleChange} required fullWidth margin="normal" 
                />

                <TextField className="textfield"
                    id="video_url" label="Video URL" variant="standard" name="video_url"
                    value={formData.video_url} onChange={handleChange} fullWidth margin="normal"
                />


                <Button className='purple' variant="contained" type="submit">Update Course</Button>
            </form>

            <Button variant="outlined" startIcon={<DeleteIcon />} color="error" onClick={handleDeleteCourse} >
                Delete Course
            </Button>

        </div>
    );
};

export default EditCourse;
