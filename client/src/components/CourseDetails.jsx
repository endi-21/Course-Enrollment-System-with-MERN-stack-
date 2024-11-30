import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
    const location = useLocation();
    const { course } = location.state || {};
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [enrollmentId, setEnrollmentId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const studentId = user?.data?.user?._id || null;
    const [endDate, setEndDate] = useState(null);

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
                    student_id: studentId,
                    course_id: course._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
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


    const handleUnenroll = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/enrollments/${enrollmentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
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
                        Authorization: `Bearer ${user.data.token}`,
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
            <h2>Instructor: {course.instructorName}</h2>
            <p><strong>Course ID:</strong> {course._id}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Released on:</strong> {course.createdAt}</p>


            <div>
                <h3>Course Video</h3>
                <iframe
                    width="600"
                    height="400"
                    src={course.video_url}
                    title="Course Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div>
                {isEnrolled ? (
                    <div>
                        <button onClick={handleUnenroll}>Unenroll</button>
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
