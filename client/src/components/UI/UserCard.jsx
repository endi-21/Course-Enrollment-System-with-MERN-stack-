import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

export default function UserCard(props) {
    const { userData } = props;
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.data?.user?._id;
    const userRole = user?.data?.user?.role;

    const handleCardClick = () => {
        if (userId === userData._id || userRole === 'admin') {
            navigate('/edit-user', { state: { userId } });
        }
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

                    <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: '0.5rem' }}>
                        Email: {userData.email}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Role: {userData.role}
                    </Typography>
                </CardContent>

            </CardActionArea>
        </Card>
    );
}
