import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function CourseCard(props) {

    const { title, instructor } = props

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Instructor: {instructor}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}