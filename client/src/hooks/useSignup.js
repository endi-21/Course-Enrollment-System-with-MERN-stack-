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

            const standardizedData = {
                success: response.data.success,
                data: {
                    user: response.data.data,
                    token: response.data.token,
                },
            };

            localStorage.setItem('user', JSON.stringify(standardizedData));

            dispatch({ type: 'LOGIN', payload: standardizedData });

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };


    return { signup, isLoading, error };
};
