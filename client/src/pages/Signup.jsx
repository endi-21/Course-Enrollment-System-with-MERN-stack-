import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { useNavigate } from "react-router-dom"

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
		navigate('/'); 
	}

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h3>Sign Up</h3>

			<label>Name:</label>
			<input
				type="text"
				onChange={(e) => setName(e.target.value)}
				value={name}
			/> <br />
			<label>Email:</label>
			<input
				type="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/> <br />

			<label>Password:</label>
			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/> <br />

			<label>Role:</label>
			<input
				type="radio"
				onChange={(e) => setRole(e.target.value)}
				value="student"
				name="role"
				checked={role === "student"}
			/>
			Student
			<input
				type="radio"
				onChange={(e) => setRole(e.target.value)}
				value="instructor"
				name="role"
				checked={role === "instructor"}
			/>
			Instructor
			<br />

			<label>Description:</label>
			<input
				type="text"
				onChange={(e) => setDescription(e.target.value)}
				value={description}
			/> <br />

			<label>Profile Picture URL:</label>
			<input
				type="text"
				onChange={(e) => setPic(e.target.value)}
				value={pic}
			/> <br />

			<button type="submit" disabled={isLoading}>Sign up</button>
			{error && <div className="error">{error}</div>}
		</form>
	)
}

export default Signup