import { useState, useEffect } from 'react';
import CourseCard from './UI/CourseCard';
import axios from 'axios';

const EnrolledCourses = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.data?.user?._id) {
                setError('User information is missing or invalid');
                return;
            }

            try {
                // get courses
                const courseResponse = await axios.get(
                    `http://localhost:5000/api/courses/student/${user.data.user._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.data.token}`,
                        },
                    }
                );

                const courseData = courseResponse.data.data;

                // get instructor names 
                const instructorNames = await Promise.all(
                    courseData.map(async (course) => {
                        const instructorResponse = await axios.get(
                            `http://localhost:5000/api/users/${course.instructor_id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${user.data.token}`,
                                },
                            }
                        );

                        return {
                            ...course,
                            instructorName: instructorResponse.data.data.name,
                        };
                    })
                );

                setCourses(instructorNames);
            } catch (err) {
                setError(err.response?.data?.error || err.message);
            }
        };

        fetchCourses();
    }, []);

    if (!courses.length && !error) {
        return <div>You have not enrolled in any courses yet.</div>;
    } else if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Enrolled Courses</h2>
            <div>
                {courses.map((course) => (
                    <CourseCard
                        key={course._id}                       
                        courseData={course}
                    />
                ))}
            </div>
        </div>
    );
};

export default EnrolledCourses;
