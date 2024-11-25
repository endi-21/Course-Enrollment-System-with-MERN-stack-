import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.js';

// pages & components
import Login from './pages/Login';
import StudentDashboard from './pages/dashboards/StudentDashboard.jsx';
import InstructorDashboard from './pages/dashboards/InstructorDashboard.jsx';
import AdminDashboard from './pages/dashboards/AdminDashboard.jsx';
import RoleProtectedRoute from './components/RoleProtectedRoute';

function App() {
	const { user } = useAuthContext();

	const dashboard = (() => {
		const role = user?.data?.user?.role;

		switch (role) {
			case 'student':
				return '/StudentDashboard';
			case 'instructor':
				return '/InstructorDashboard';
			case 'admin':
				return '/AdminDashboard';
			default:
				return '/login';
		}
	})();

	return (
		<div className="App">
			<BrowserRouter>
				<div className="pages">
					<Routes>
						<Route
							path="/StudentDashboard"
							element={
								<RoleProtectedRoute role="student">
									<StudentDashboard />
								</RoleProtectedRoute>
							}
						/>
						<Route
							path="/InstructorDashboard"
							element={
								<RoleProtectedRoute role="instructor">
									<InstructorDashboard />
								</RoleProtectedRoute>
							}
						/>
						<Route
							path="/AdminDashboard"
							element={
								<RoleProtectedRoute role="admin">
									<AdminDashboard />
								</RoleProtectedRoute>
							}
						/>
						<Route
							path="/"
							element={user ? <Navigate to={dashboard} /> : <Navigate to="/login" />}
						/>
						<Route
							path="/login"
							element={!user ? <Login /> : <Navigate to={dashboard} />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
