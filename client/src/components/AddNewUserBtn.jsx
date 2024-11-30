import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddNewUserBtn = () => {

    const navigate = useNavigate();

    const handleAddNewCourse = () => {
        navigate('/add-new-user');
    };

    return (
        <div>
            <button onClick={handleAddNewCourse}>Add New User</button>
        </div>
    )
}

export default AddNewUserBtn