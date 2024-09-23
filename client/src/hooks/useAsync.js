import { useState, useEffect, useCallback } from 'react';

const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setStatus('pending');
    setData(null);
    setError(null);

    let isMounted = true;

    asyncFunction()
      .then(response => {
        if (isMounted) {
          setData(response.data);
          setStatus('success');
        }
      })
      .catch(error => {
        if (isMounted) {
          setError(error.message || 'Unknown error');
          setStatus('error');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
};

export default useAsync;