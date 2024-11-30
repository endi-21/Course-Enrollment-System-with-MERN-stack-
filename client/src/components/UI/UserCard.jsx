import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ userData }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/edit-user', { state: { userId: userData._id } });
    };

    return (
        <Card sx={{ maxWidth: 345 }} onClick={handleCardClick}>
            <CardActionArea>
                <CardContent>
                    <img
                        src={userData.profilePic}
                        alt={`${userData.name}'s profile`}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginBottom: '1rem',
                        }}
                    />
                    <Typography gutterBottom variant="h5" component="div">
                        {userData.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {userData.email}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default UserCard;
