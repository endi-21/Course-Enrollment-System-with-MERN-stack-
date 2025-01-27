import { useState, useEffect } from 'react';
import CourseCard from './UI/CourseCard';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const NotEnrolledCourses = () => {
    const { user } = useAuthContext();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {

            const token = localStorage.getItem("authToken");

            try {
                // get courses
                const courseResponse = await axios.get(
                    `http://localhost:5000/api/courses/student/not-enrolled/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCourses(courseResponse.data.data);

            } catch (err) {
                setError(err.response?.data?.error || err.message);
            }
        };

        fetchCourses();
    }, []);

    if (!courses.length) {
        return <div>You have not enrolled any courses yet!</div>;
    } else if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Check the other courses:</h2>
            <div className='course-list'>
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

export default NotEnrolledCourses;
