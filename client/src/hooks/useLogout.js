import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem('authToken');

    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};
