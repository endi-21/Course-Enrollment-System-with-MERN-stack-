import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const token = response.data.token;

      localStorage.setItem('authToken', token);

      const user = jwtDecode(token);
      dispatch({ type: 'LOGIN', payload: user });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return { login, isLoading, error };
};
