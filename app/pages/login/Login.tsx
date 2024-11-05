import React, { useState } from "react";
import {
  Alert,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Button from "@/components/UI/Button";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Fonts } from "@/constants/Fonts";
import { Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post("http://10.0.2.2:8000/api/token/", {
      username,
      password,
    });

    if (response.status === 200) {
      const { access, refresh } = response.data;

      // Save tokens to secure storage (e.g., AsyncStorage)
      await AsyncStorage.setItem("accessToken", access);
      await AsyncStorage.setItem("refreshToken", refresh);
      console.log(refresh);

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
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const passwordOpacity = useSharedValue(0);

  // Animated style for the password fields
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: passwordOpacity.value,
    transform: [{ translateY: withTiming(showPasswordFields ? 0 : 20) }],
  }));

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/v1/password-reset/",
        { email }
      );
      if (response.status === 200) {
        Alert.alert("Check your email", "Password reset instructions sent.");

        // Show password fields with animation
        setShowPasswordFields(true);
        passwordOpacity.value = withTiming(1, { duration: 500 });
      }
    } catch (error) {
      console.error("Password reset error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const { top } = useSafeAreaInsets();
  const handleLogin = () => {
    login(username, password);
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header
        children="Login"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />
      <View style={styles.inputFieldCon}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputAndLabelCon}>
          <Text style={styles.label}>username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputAndLabelCon}>
          <Text style={styles.label}>password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.forgotPass}
        >
          <Text style={styles.passText}>Forgot Password</Text>
        </TouchableOpacity>
        <Button
          title="Login"
          onPress={handleLogin}
          titleColor={Colors.white}
          bg={Colors.mainColor}
          radius={radius.small}
          width={"90%"}
        />
      </View>
      {/* <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View style={styles.modalContent}>
          <Text style={[styles.loginText, { alignSelf: "center" }]}>
            Reset Password
          </Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <Button
            title="Reset Password"
            onPress={handlePasswordReset}
            titleColor={Colors.white}
            bg={Colors.mainColor}
            radius={radius.small}
            width={"100%"}
          />
        </View>
      </Modal> */}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={styles.modalContent}>
          <Text style={[styles.loginText, { alignSelf: "center" }]}>
            Reset Password
          </Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Button
            title="Reset Password"
            onPress={handlePasswordReset}
            titleColor={Colors.white}
            bg={Colors.mainColor}
            radius={radius.small}
            width={"100%"}
          />

          {/* Animated password fields */}
          {showPasswordFields && (
            <Animated.View style={[styles.passwordFields, animatedStyle]}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={styles.input}
              />

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
              />

              <Button
                title="Submit"
                onPress={() => Alert.alert("Password Updated!")}
                titleColor={Colors.white}
                bg={Colors.mainColor}
                radius={radius.small}
                width={"100%"}
              />
            </Animated.View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inputFieldCon: {
    width: "85%",
    alignSelf: "center",
    borderRadius: radius.small,
    shadowColor: Colors.text,
    elevation: 10,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    height: 400,
    marginTop: 80,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderColor: Colors.mainColor,
    borderWidth: 1,
    borderRadius: radius.small,
    backgroundColor: Colors.white,
    marginBottom: 20,
  },
  loginText: {
    fontSize: Fonts.large,
    fontWeight: "600",
    color: Colors.mainColor,
    marginVertical: 20,
  },
  inputAndLabelCon: {
    width: "90%",
    alignSelf: "center",
  },
  label: {
    fontSize: Fonts.regular,
    color: Colors.text,
    marginBottom: 2,
  },
  forgotPass: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  passText: {
    color: Colors.mainColor,
    textDecorationLine: "underline",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    height: 300,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  passwordFields: {
    marginTop: 20,
  },
});

export default LoginScreen;
