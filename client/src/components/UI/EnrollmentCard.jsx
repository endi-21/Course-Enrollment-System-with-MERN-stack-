import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

const EnrollmentCard = ({ enrollmentData }) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/edit-enrollment', { state: { enrollmentId: enrollmentData._id } });
    };

    return (
        <Card sx={{ maxWidth: 345 }} onClick={handleCardClick}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Enrollment ID: {enrollmentData._id}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Student ID: {enrollmentData.student_id}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Course ID: {enrollmentData.course_id}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Start Date: {new Date(enrollmentData.start_date).toLocaleDateString()}
                    </Typography>

                    {enrollmentData.end_date && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            End Date: {new Date(enrollmentData.end_date).toLocaleDateString()}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default EnrollmentCard;
