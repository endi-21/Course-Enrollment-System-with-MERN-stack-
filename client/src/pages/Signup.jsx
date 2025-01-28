import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { useNavigate } from "react-router-dom"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const Signup = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState('')
	const [description, setDescription] = useState('')
	const [pic, setPic] = useState('')
	const { signup, error, isLoading } = useSignup()

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		await signup(name, email, password, role, description, pic)
		navigate('/login');
	}

	const navigateToLogin = () => {
		navigate('/login');
	};

	return (
		<div className="login-container">
			<form className="login" onSubmit={handleSubmit}>
				<h3>Sign Up</h3>

				<TextField
					className="textfield"
					id="name"
					label="Name"
					variant="standard"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					fullWidth
					margin="normal"
				/>

				<TextField
					className="textfield"
					id="email"
					label="Email"
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
				/> <br /> <br />

				<FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					defaultValue="female"
					name="radio-buttons-group"
					row
				>
					<FormControlLabel
						value="student"
						control={<Radio />}
						label="Student"
						onChange={(e) => setRole(e.target.value)}
					/>
					<FormControlLabel
						value="instructor"
						control={<Radio />}
						label="Instructor"
						onChange={(e) => setRole(e.target.value)}
					/>
				</RadioGroup>


				<TextField
					className="textfield"
					id="description"
					label="Description"
					variant="standard"
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					fullWidth
					margin="normal"
				/>

				<TextField
					className="textfield"
					id="profile-pic"
					label="Profile Picture URL"
					variant="standard"
					name="pic"
					value={pic}
					onChange={(e) => setPic(e.target.value)}
					fullWidth
					margin="normal"
				/>

				<Button className="purple" variant="contained" type="submit" disabled={isLoading}>
					Sign up
				</Button>
				{error && <div className="error">{error}</div>}

				<Button onClick={navigateToLogin}>
					Log in
				</Button>
			</form>
		</div>
	);

}

export default Signup