import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

export default function CourseCard(props) {
    const { courseData } = props; // Pass the full course object
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/course-details', { state: { course: courseData } });
    };

    return (
        <Card sx={{ maxWidth: 345 }} onClick={handleCardClick}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {courseData.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Instructor: {courseData.instructorName}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
