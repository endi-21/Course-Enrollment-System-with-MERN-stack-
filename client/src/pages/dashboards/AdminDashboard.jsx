import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

const AdminDashboard = () => {

	return (
		<div>
			<h1>Instructor Dashboard</h1>
			<AdminNavbar />


			<Outlet />
		</div>
	);
};

export default AdminDashboard;
