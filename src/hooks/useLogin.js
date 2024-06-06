import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (userType, email, password) => {
    setIsLoading(true);
    setError(null);

    let url = '';

    switch (userType) {
      case 'user':
        url = process.env.REACT_APP_LOGIN_USER_ENDPOINT;
        break;
      case 'specialist':
        url = process.env.REACT_APP_LOGIN_SPECIALIST_ENDPOINT;
        break;
      default:
        throw new Error('Invalid user type');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log("Login response: ", json);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
