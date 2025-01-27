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
        <nav className="navbar">
            <div className="navbar-links">
                <Link to={`/${dashboard}/`} className="navbar-link">Home</Link>
                <Link to={`/${dashboard}/profile`} className="navbar-link">Profile</Link>
                <Link to={`/${dashboard}/search`} className="navbar-link">Search</Link>
            </div>
            <div className="navbar-actions">
                <img
                    src={profilePic}
                    alt="User Profile"
                    className="navbar-profile-pic"
                />
                <Button variant="outlined" color="error" onClick={handleLogout} >
                    Log out
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
