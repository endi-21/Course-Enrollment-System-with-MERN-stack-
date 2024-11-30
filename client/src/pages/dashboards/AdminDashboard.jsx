import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

const AdminDashboard = ({ dashboard }) => {

	return (
		<div>
			<h1>Admin Dashboard</h1>
			<AdminNavbar dashboard={dashboard}/>


			<Outlet />
		</div>
	);
};

export default AdminDashboard;
