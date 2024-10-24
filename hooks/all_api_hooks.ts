// hooks/useFetch.js

import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = "http://10.0.2.2:8000/api/v1/";

const useApiHook = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl + url}`);
        setData(response.data);
      } catch (err: any) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, loading, error };
};

export default useApiHook;
