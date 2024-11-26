import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BasicCard(props) {

    const { title, description } = props

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Enroll</Button>
            </CardActions>
        </Card>
    );
}
