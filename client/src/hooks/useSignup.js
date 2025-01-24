import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password, role, description, pic) => {
    if (localStorage.getItem('authToken')) return;

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

      const token = response.data.token;

      localStorage.setItem('authToken', token);

      const user = jwtDecode(token);
      dispatch({ type: 'LOGIN', payload: user });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.error || 'An unexpected error occurred');
    }
  };

  return { signup, isLoading, error };
};
