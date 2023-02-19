import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        if (response.ok) {
            const json = await response.json();
            // save the users to local storage
            localStorage.setItem('user', JSON.stringify(json));
            // update the auth context
            dispatch({type: 'LOGIN', payload: json});
        } else {
            const json = await response.json();
            setError(json.error);
        }
        setIsLoading(false);
    }

    return { login, isLoading, error }
};
