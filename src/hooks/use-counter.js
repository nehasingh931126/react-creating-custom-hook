import {useState, useEffect} from 'react';
const useCounter = (upwardCounter)=> {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(upwardCounter);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return { counter}
}

export default useCounter;