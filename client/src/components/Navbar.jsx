import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const Navbar = ({ dashboard }) => {
    const { logout } = useLogout();

    const handleLogout = () => {
        logout(); 
        window.location.href = '/login';
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const profilePic = user?.data?.user?.profilePic || 'https://static.vecteezy.com/system/resources/previews/002/387/693/non_2x/user-profile-icon-free-vector.jpg';

    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }} /*put to css later*/>
            <Link to={`/${dashboard}/`} style={{ margin: '0 10px' }}>
                Home
            </Link>
            <Link to={`/${dashboard}/edit`} style={{ margin: '0 10px' }}>
                Edit
            </Link>
            <Link to={`/${dashboard}/search`} style={{ margin: '0 10px' }}>
                Search
            </Link>

            <img
                src={profilePic}
                alt="User Profile"
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} /*put to css later*/
            />
            <button onClick={handleLogout}>
                Log out
            </button>
        </nav>
    );
};

export default Navbar;
