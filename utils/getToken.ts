import * as SecureStore from 'expo-secure-store'
export const getToken = async () => {
  try {
    const token = await SecureStore.getItem("access_token");
    
    if (token !== null) {
      return token; // Token found
    } else {
      console.log("No token found.");
      return null; // Token not found
    }
  } catch (error) {
    console.error("Error retrieving token: ", error);
    return null;
  }
};
