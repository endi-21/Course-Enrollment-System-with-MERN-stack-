import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const InstructorDashboard = ({dashboard}) => {
	return (
		<div>
			<h1>Instructor Dashboard</h1>
			<Navbar dashboard={dashboard} />
			<Outlet />
		</div>
	);
}

export default InstructorDashboard