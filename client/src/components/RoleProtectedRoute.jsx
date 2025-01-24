import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const RoleProtectedRoute = ({ role, children }) => {
	const { user } = useAuthContext();

	const userRole = user?.role;

	if (!user) {
		return <Navigate to="/login" />;
	}

	if (userRole !== role) {
		const defaultDashboard = (() => {
			switch (userRole) {
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

		return <Navigate to={defaultDashboard} />;
	}

	return children;
};

export default RoleProtectedRoute;
