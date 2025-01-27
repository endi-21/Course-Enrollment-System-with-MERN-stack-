import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const AddNewCourseBtn = () => {
    const navigate = useNavigate();

    const handleAddNewCourse = () => {
        navigate('/add-new-course');
    };

    return (
        <div>
            Add New Course <Button className='purple round' variant="contained" onClick={handleAddNewCourse}><AddIcon /></Button>
        </div>
    )
}

export default AddNewCourseBtn;
