import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, error, isLoading } = useLogin();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await login(email, password);
	};

	const navigateToSignup = () => {
		navigate('/signup');
	};

	return (
		<div className="login-container">
			<form className="login" onSubmit={handleSubmit}>
				<h3>Log In</h3>
				<TextField
					className="textfield"
					id="email"
					label="Email address"
					variant="standard"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					fullWidth
					margin="normal"
				/>

				<TextField
					className="textfield"
					id="password"
					label="Password"
					variant="standard"
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					fullWidth
					margin="normal"
				/>


				<Button className='purple' variant="contained" type="submit" disabled={isLoading}>Log in</Button>
				{error && <div className="error">{error}</div>}

				<Button className="sign-in-up-btn" onClick={navigateToSignup} >
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default Login;
