import { useState, useCallback } from 'react';

const useHttpHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendRequest = useCallback(async (requestConfigObject, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfigObject.url,{
                    method: requestConfigObject.method ?? 'GET',
                    headers: requestConfigObject.headers ?? {},
                    body: requestConfigObject.body ? JSON.stringify(requestConfigObject.body) : null
                }
            );
            if (!response.ok) {
                throw new Error('Request failed!');
            }
            const data = await response.json();
            applyData(data)
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttpHook;