import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios';

export const useLogin = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const { dispatch } = useAuthContext()

	const login = async (email, password) => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await axios.post('http://localhost:5000/api/users/login', {
				email,
				password,
			});

			localStorage.setItem('user', JSON.stringify(response.data));

			dispatch({ type: 'LOGIN', payload: response.data });

			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			setError(err.response?.data?.error || 'An unexpected error occurred');
		}
	}

	return { login, isLoading, error }
}