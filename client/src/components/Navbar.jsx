import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext.js';
import userDefaultPic from '../assets/userDefaultPic.png'
import Button from "@mui/material/Button";

const Navbar = ({ dashboard }) => {
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/login');
    };

    const { user } = useAuthContext();
    const profilePic = user?.profilePic || userDefaultPic;
    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }} /*put to css later*/>
            <Link to={`/${dashboard}/`} style={{ margin: '0 10px' }}>
                Home
            </Link>
            <Link to={`/${dashboard}/profile`} style={{ margin: '0 10px' }}>
                Profile
            </Link>
            <Link to={`/${dashboard}/search`} style={{ margin: '0 10px' }}>
                Search
            </Link>

            <img
                src={profilePic}
                alt="User Profile"
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} /*put to css later*/
            />
            <Button variant="outlined" color="error" onClick={handleLogout} >
                Log out
            </Button>
        </nav>
    );
};

export default Navbar;
