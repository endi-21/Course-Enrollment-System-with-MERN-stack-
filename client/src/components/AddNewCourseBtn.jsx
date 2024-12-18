import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddNewCourseBtn = () => {

    const navigate = useNavigate();

    const handleAddNewCourse = () => {
        navigate('/add-new-course');
    };

    return (
        <div>
            <button onClick={handleAddNewCourse}>Add New Course</button>
        </div>
    )
}

export default AddNewCourseBtn