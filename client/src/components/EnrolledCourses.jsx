import { useState, useEffect } from 'react';
import CourseCard from './UI/CourseCard';

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
                const response = await fetch(`http://localhost:5000/api/courses/student/${user.data.user._id}`, {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch enrolled courses');
                }

                const result = await response.json();

                // get instructor names 
                const coursesWithInstructors = await Promise.all(
                    result.data.map(async (course) => {
                        const instructorResponse = await fetch(`http://localhost:5000/api/users/${course.instructor_id}`, {
                            headers: {
                                Authorization: `Bearer ${user.data.token}`,
                            },
                        });

                        if (!instructorResponse.ok) {
                            throw new Error(`Failed to fetch instructor for course ${course.title}`);
                        }

                        const instructorData = await instructorResponse.json();
                        return { ...course, instructorName: instructorData.data.name };
                    })
                );

                setCourses(coursesWithInstructors);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCourses();
    }, []);

    if (!courses.length) {
        return <div>You have not enrolled any courses yet.</div>;
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
                        title={course.title}
                        instructor={course.instructorName || 'Loading...'}
                    />
                ))}
            </div>
        </div>
    );
};

export default EnrolledCourses;
