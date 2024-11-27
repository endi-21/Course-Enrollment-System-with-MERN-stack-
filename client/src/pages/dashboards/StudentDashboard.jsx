import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const StudentDashboard = ({dashboard}) => {
	return (
		<div>
			<h1>Student Dashboard</h1>
			<Navbar dashboard={dashboard}/>
			<Outlet /> 
		</div>
	);
};

export default StudentDashboard;
