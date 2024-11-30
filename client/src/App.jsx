import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.js';

// pages & components
import Login from './pages/Login';
import Signup from './pages/Signup.jsx';
import StudentDashboard from './pages/dashboards/StudentDashboard.jsx';
import InstructorDashboard from './pages/dashboards/InstructorDashboard.jsx';
import AdminDashboard from './pages/dashboards/AdminDashboard.jsx';
import EnrolledCourses from './components/EnrolledCourses.jsx';
import NotEnrolledCourses from './components/NotEnrolledCourses.jsx';
import EditUser from './components/EditUser.jsx';
import Search from './components/Search.jsx';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import CourseDetails from './pages/CourseDetails.jsx';
import InstructorCourses from './components/InstructorCourses.jsx';
import EditCourse from './pages/EditCourse.jsx';
import UserProfile from './components/UserProfile.jsx';

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

						<Route path="/course-details" element={<CourseDetails />} />

						<Route path='/edit-course' element={<EditCourse />} />

						<Route path='/edit-user' element={<EditUser />} />

						<Route
							path="/StudentDashboard"
							element={
								<RoleProtectedRoute role="student">
									<StudentDashboard dashboard="StudentDashboard" />
								</RoleProtectedRoute>
							}
						>
							<Route
								index
								element={
									<div>
										<EnrolledCourses />
										<NotEnrolledCourses />
									</div>
								}
							/>
							<Route path="profile" element={<UserProfile />} />
							<Route path="search" element={<Search />} />
						</Route>


						<Route
							path="/InstructorDashboard"
							element={
								<RoleProtectedRoute role="instructor">
									<InstructorDashboard dashboard="InstructorDashboard" />
								</RoleProtectedRoute>
							}
						>
							<Route
								index
								element={
									<div>
										<InstructorCourses />
									</div>
								}
							/>
							<Route path="profile" element={<UserProfile />} />
							<Route path="search" element={<Search />} />
						</Route>


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
							element={!user ? <Login /> : <Navigate to="/" />}
						/>
						<Route
							path="/signup"
							element={!user ? <Signup /> : <Navigate to="/" />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
