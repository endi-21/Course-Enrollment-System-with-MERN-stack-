import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const AdminNavbar = ({ dashboard }) => {
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/login');
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const profilePic = user?.data?.user?.profilePic || 'https://static.vecteezy.com/system/resources/previews/002/387/693/non_2x/user-profile-icon-free-vector.jpg';

    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }} /*put to css later*/>
            <Link to={`/${dashboard}/`} style={{ margin: '0 10px' }}>
                Home
            </Link>
            <Link to={`/${dashboard}/get-all`} style={{ margin: '0 10px' }}>
                Get Users & Courses
            </Link>
            <Link to={`/${dashboard}/search`} style={{ margin: '0 10px' }}>
                Search
            </Link>

            <button onClick={handleLogout}>
                Log out
            </button>
        </nav>
    );
};

export default AdminNavbar;
