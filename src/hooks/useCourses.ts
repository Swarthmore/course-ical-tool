import {useState, useEffect} from 'react';
import {Course} from '../types/course';

export default function useCourses(endpoint: string) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);

    // When the endpoint changes, get the new data.
    useEffect(() => {
        setFetching(true);
        setError(null);
        fetch(endpoint)
            .then(response => response.json())
            .then(json => {
                setCourses(json)
            })
            .catch(error => setError(error))
            .finally(() => {
                setFetching(false);
            });
    }, [endpoint]);

    return {fetching, courses, error};
}