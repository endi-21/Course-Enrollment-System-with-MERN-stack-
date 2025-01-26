import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function CourseCard(props) {
    const { courseData } = props;
    const navigate = useNavigate();

    const {user} = useAuthContext();
    const userId = user?.id;
    const userRole = user?.role;

    const handleCardClick = () => {
        if (userId === courseData.instructor._id || userRole === 'admin') {
            navigate('/edit-course', { state: { course: courseData } });
        } else {
            navigate('/course-details', { state: { course: courseData } });
        }
    };


    return (
        <Card sx={{ maxWidth: 345 }} onClick={handleCardClick}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {courseData.title}
                    </Typography>
                    {user.id !== courseData.instructor._id && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Instructor: {courseData.instructor.name}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
