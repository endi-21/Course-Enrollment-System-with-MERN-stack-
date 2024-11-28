import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (name, email, password, role, description, pic) => {
        if (localStorage.getItem('user')) return; // Prevent duplicate updates

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                name,
                email,
                password,
                role,
                description,
                pic,
            });

            localStorage.setItem('user', JSON.stringify(response.data));

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: response.data });

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    return { signup, isLoading, error };
};
