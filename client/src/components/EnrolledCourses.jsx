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
                const response = await fetch(`http://localhost:5000/api/courses/student/${user.data.user._id}`, {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch enrolled courses');
                }

                const result = await response.json();
                setCourses(result.data); 
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCourses();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!courses.length) {
        return <div>No courses enrolled yet.</div>;
    }

    return (
        <div>
          <h2>Enrolled Courses</h2>
          <div>
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                title={course.title}
                description={course.description}
              />
            ))}
          </div>
        </div>
      );
};

export default EnrolledCourses;
