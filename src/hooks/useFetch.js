import { useState, useEffect, useCallback } from "react";

const useFetch = (
  fetchFn,
  initialData = null,
  immediate = false,
  dependencies = []
) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFn(...args);
        setData(result);
        return result;
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchFn]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [...dependencies, immediate, execute]);

  return { data, loading, error, execute, setData };
};

export default useFetch;
