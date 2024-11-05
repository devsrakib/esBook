import React, { useState } from "react";
import { Alert, TextInput, View, StyleSheet } from "react-native";
import Button from "@/components/UI/Button";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post("http://10.0.2.2:8000/api/v1/token/", {
      username,
      password,
    });

    if (response.status === 200) {
      const { access, refresh } = response.data;

      // Save tokens to secure storage (e.g., AsyncStorage)
      await AsyncStorage.setItem("accessToken", access);
      await AsyncStorage.setItem("refreshToken", refresh);

      Alert.alert("Login Successful", "Welcome back!");
    }
  } catch (error) {
    console.error("Login error:", error);
    Alert.alert("Login Failed", "Invalid username or password");
  }
};

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleLogin}
        titleColor={Colors.white}
        bg={Colors.mainColor}
        radius={radius.small}
        width={"90%"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  input: {
    width: "90%",
    padding: 10,
    marginVertical: 10,
    borderColor: Colors.mainColor,
    borderWidth: 1,
    borderRadius: radius.small,
    backgroundColor: Colors.white,
  },
});

export default LoginScreen;
