import { useLocation } from 'react-router-dom';

const CourseDetails = () => {
    const location = useLocation();
    const { course } = location.state || {}; // Ensure state exists

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
            
        </div>
    );
};

export default CourseDetails;
