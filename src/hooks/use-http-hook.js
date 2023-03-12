import { useState } from 'react';

const useHttpHook = (requestConfigObject, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendRequest = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfigObject.url,{
                    method: requestConfigObject.method,
                    headers: requestConfigObject.headers,
                    body: JSON.stringify(requestConfigObject.body)
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
    };

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttpHook;