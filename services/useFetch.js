import {useEffect, useState} from 'react';

const useFetch = (fetchFunction, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('error'));
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);
  return {data, loading, error, refetch: fetchData, reset};
};

export default useFetch;
