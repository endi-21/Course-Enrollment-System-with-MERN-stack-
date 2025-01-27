import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddNewCourse = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video_url: '',
        instructor: '',
    });

    const { user } = useAuthContext()
    const token = localStorage.getItem("authToken");
    const role = user?.role;
    const instructorId = role === 'instructor' ? user.id : '';
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
            instructor: role === 'instructor' ? instructorId : formData.instructor,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/courses', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
        <div className='form'>
            <h2>Add New Course</h2>

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

                {role === 'admin' && (
                    <label>
                        Instructor ID:
                        <input
                            type="text"
                            name="instructor_id"
                            value={formData.instructor}
                            onChange={handleChange}
                            required
                        />
                    </label>
                )}

                <br /> <br />
                <Button className='purple' variant="contained" type="submit">Add Course</Button>
            </form>
        </div>
    );
};

export default AddNewCourse;
