import React from 'react'
import EnrolledCourses from '../../components/EnrolledCourses'
import NotEnrolledCourses from '../../components/NotEnrolledCourses'

const StudentDashboard = () => {
	return (
		<div>
			<h1>Student Dashboard</h1>
			<EnrolledCourses />
			<NotEnrolledCourses />
		</div>
	)
}

export default StudentDashboard