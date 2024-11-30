import { useState, useEffect } from 'react';
import CourseCard from './UI/CourseCard';
import axios from 'axios';

const InstructorCourses = () => {
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
                const courseResponse = await axios.get(
                    `http://localhost:5000/api/courses/instructor/${user.data.user._id}`
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
            <h2>My Courses</h2>
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

export default InstructorCourses;
