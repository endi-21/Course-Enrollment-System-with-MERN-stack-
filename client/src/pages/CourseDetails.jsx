import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const CourseDetails = () => {
    const location = useLocation();
    const { course } = location.state || {};
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [enrollmentId, setEnrollmentId] = useState(null);
    const { user } = useAuthContext();
    const studentId = user?.id || null;
    const [endDate, setEndDate] = useState(null);
    const token = localStorage.getItem("authToken"); 
    const videoId = course.video_url.split('v=')[1].split('&')[0];

    useEffect(() => {
        if (!course) return;

        const fetchEnrollment = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/enrollments/${studentId}/${course._id}`);
                if (response.data.success) {
                    setIsEnrolled(true);
                    setEnrollmentId(response.data.data._id);
                    setEndDate(response.data.data.end_date);
                } else {
                    setIsEnrolled(false);
                }
            } catch (error) {
                console.error('Error fetching enrollment:', error);
            }
        };

        fetchEnrollment();
    }, [studentId, course]);

    const handleEnroll = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/enrollments/',
                {
                    student: studentId,
                    course: course._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                setIsEnrolled(true);
                setEnrollmentId(response.data.data._id);
            }
        } catch (error) {
            console.error('Error enrolling:', error);
        }
    };


    const handleUnroll = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/enrollments/${enrollmentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            if (response.data.success) {
                setIsEnrolled(false);
                setEnrollmentId(null);
                setEndDate(null);
            }
        } catch (error) {
            console.error('Error unenrolling:', error);
        }
    };

    const handleMarkAsFinished = async () => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/enrollments/${enrollmentId}/end-date`,
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                setEndDate(true);
            }
        } catch (error) {
            console.error('Error finishing course:', error);
        }
    };

    if (!course) {
        return <p>No course data available.</p>;
    }
    
    return (
        <div>
            <h1>Title: {course.title}</h1>
            <h2>Instructor: {course.instructor.name}</h2>
            <p><strong>Course ID:</strong> {course._id}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Released on:</strong> {course.createdAt}</p>


            <div>
                <h3>Course Video</h3>
                <iframe
                    width="600"
                    height="400"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Course Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div>
                {isEnrolled ? (
                    <div>
                        <button onClick={handleUnroll}>Unroll</button>
                        <button onClick={handleMarkAsFinished} disabled={!!endDate}>
                            Mark as finished
                        </button>
                    </div>
                ) : (
                    <button onClick={handleEnroll}>Enroll</button>
                )}
            </div>
        </div>
    );
};

export default CourseDetails;
