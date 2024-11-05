// // hooks/useFetch.js

// import { useEffect, useState } from "react";
// import axios from "axios";
// const apiUrl = "http://10.0.2.2:8000/api/v1/";

// const useApiHook = (url: string) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`${apiUrl + url}`);
//         setData(response.data);
//       } catch (err: any) {
//         setError(err);
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [apiUrl]);

//   return { data, loading, error };
// };

// export default useApiHook;

// hooks/useFetch.js
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiUrl = "http://10.0.2.2:8000/api/v1/";
const useApiHook = (endpoint: string, ownerId?: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}${endpoint}`, {
          params: { owner: ownerId },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, ownerId]);

  return { data, loading, error };
};

export default useApiHook;
