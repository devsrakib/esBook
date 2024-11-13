import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");
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
