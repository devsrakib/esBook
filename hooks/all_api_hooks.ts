// hooks/useFetch.js
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiUrl = "http://10.0.2.2:8000/api/v1/";

const useApiHook = (endpoint: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null); // Store the token here

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("access_token"); // Get token from AsyncStorage
        if (storedToken) {
          setToken(storedToken); // Set the token to state
        }
      } catch (err) {
        console.error("Error retrieving token from AsyncStorage:", err);
      }
    };
 
    getToken(); // Call the function to get token on mount
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("No token available.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
          }, // Use ownerId if needed
        };

        const response = await axios.get(`${apiUrl}${endpoint}`, config);
        setData(response.data);
      } catch (err) {
        setError(err);
        // console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, token]); // Re-run effect when token changes

  return { data, loading, error };
};

export default useApiHook;
