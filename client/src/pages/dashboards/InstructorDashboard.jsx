import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const InstructorDashboard = ({ dashboard }) => {
    const navigate = useNavigate();

    const handleAddNewCourse = () => {
        navigate('/add-new-course');
    };

    return (
        <div>
            <h1>Instructor Dashboard</h1>
            <Navbar dashboard={dashboard} />

            <button onClick={handleAddNewCourse}>Add New Course</button>

            <Outlet />
        </div>
    );
};

export default InstructorDashboard;
