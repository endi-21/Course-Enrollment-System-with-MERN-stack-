import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ dashboard }) => {
    const navigate = useNavigate();

    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
            <button onClick={() => navigate(`/${dashboard}/`)} style={{ margin: '0 10px' }}>
                Home
            </button>
            <button onClick={() => navigate(`/${dashboard}/edit`)} style={{ margin: '0 10px' }}>
                Edit
            </button>
            <button onClick={() => navigate(`/${dashboard}/search`)} style={{ margin: '0 10px' }}>
                Search
            </button>
        </nav>
    );
};

export default Navbar;
