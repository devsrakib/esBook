import React, {  useEffect, useState } from "react";
import {
  Alert,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Button from "@/components/UI/Button";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import _ from "lodash";
import * as SecureStore from 'expo-secure-store';
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { loginUser } from "@/redux/features/login/loginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = () => {
  // Declare state variables for email, password, and new password fields
  const [email, setEmail] = useState("");  // User's email input
  const [password, setPassword] = useState('');  // User's password input
  const [newPassword, setNewPassword] = useState("");  // For password reset, new password
  const [confirmPassword, setConfirmPassword] = useState("");  // Confirm password field
  const [showPasswordFields, setShowPasswordFields] = useState(false);  // To toggle reset password fields
  const [isModalVisible, setIsModalVisible] = useState(false);  // To control modal visibility
  // Select auth status and error from redux store
  const { status, error, user } = useAppSelector((state) => state.auth);

  // For controlling the modal animation height
  const modalHeight = useSharedValue(200);

  
  // Dispatch function from redux
  const dispatch = useAppDispatch();

  // Router hook for navigation
  const router = useRouter();
  
  // Safe area insets for handling different screen sizes (top padding)
  const { top } = useSafeAreaInsets();

  // Handle modal height change animation based on whether the reset password fields are visible
  useEffect(() => {
    modalHeight.value = withTiming(showPasswordFields ? 400 : 260, {
      duration: 500,
    });
  }, [showPasswordFields]);

  // Animated style for the modal content height
  const animatedStyle = useAnimatedStyle(() => ({
    height: modalHeight.value,
  }));

  // Function to handle password reset request
  const handlePasswordReset = async () => {
    setShowPasswordFields(true);  // Show the reset password fields
  };

  // Function to handle login form submission
  const handleSubmit = () => {
    dispatch(loginUser({ email, password }));  // Dispatch login action with email and password
  };

// useEffect to handle successfully login and routing
useEffect(() =>{
async function handleRouting(){
  if(status === 'succeeded'){
    await SecureStore.setItem('accessToken', user?.token?.refresh )
    await AsyncStorage.setItem('access_token', user?.token?.access)
    router?.push('/(tabs)')
    }
}
handleRouting()
}, [router, status])
  
// console.log(user);


  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {/* Stack Screen options for hiding header */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.inputFieldCon}>
        {/* Animating the login text */}
        <View style={{ flexDirection: "row" }}>
          <Animated.Text
            entering={FadeInDown.delay(100)
              .duration(500)
              .springify()
              .damping(8)}
            style={styles.loginText}
          >
            L
          </Animated.Text>
          {/* Repeat animation for each character of 'Login' */}
          <Animated.Text
            entering={FadeInDown.delay(150)
              .duration(500)
              .springify()
              .damping(8)}
            style={styles.loginText}
          >
            o
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(200)
              .duration(500)
              .springify()
              .damping(8)}
            style={styles.loginText}
          >
            g
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(250)
              .duration(500)
              .springify()
              .damping(8)}
            style={styles.loginText}
          >
            i
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(300)
              .duration(500)
              .springify()
              .damping(8)}
            style={styles.loginText}
          >
            n
          </Animated.Text>
        </View>

        {/* Email input field */}
        <View style={styles.inputAndLabelCon}>
          <Animated.Text
            entering={FadeInDown.delay(100)
              .springify()
              .damping(80)
              .stiffness(200)}
            style={styles.label}
          >
            Email
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(200)
              .springify()
              .damping(80)
              .stiffness(200)}
          >
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(e) => setEmail(e)}  // Update email state on text change
              autoCapitalize="none"
            />
          </Animated.View>
        </View>

        {/* Password input field */}
        <View style={styles.inputAndLabelCon}>
          <Animated.Text
            entering={FadeInDown.delay(400)
              .springify()
              .damping(80)
              .stiffness(200)}
            style={styles.label}
          >
            password
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(200)
              .springify()
              .damping(80)
              .stiffness(200)}
          >
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(e) => setPassword(e)}  // Update password state
              secureTextEntry
            />
          </Animated.View>
        </View>

        {/* Forgot password link */}
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.forgotPass}
        >
          <Animated.Text
            entering={FadeInDown.delay(700)
              .springify()
              .damping(80)
              .stiffness(200)}
            style={styles.passText}
          >
            Forgot Password
          </Animated.Text>
        </TouchableOpacity>

        {/* Login button */}
        <Animated.View
          entering={FadeInDown.delay(800)
            .springify()
            .damping(80)
            .stiffness(200)}
          style={{ width: "100%" }}
        >
          <Button
            title="Login"
            onPress={() => handleSubmit()}  // Call submit handler when pressed
            titleColor={Colors.white}
            bg={Colors.mainColor}
            radius={radius.small}
            width={"90%"}
          />
        </Animated.View>

        {/* Link to sign-up page */}
        <TouchableOpacity onPress={() => router?.push('/(auth)/signUp/signUp')}>
          <Text style={styles.noAccount}>I don't have an account</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for password reset */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}  // Close modal on backdrop press
        backdropOpacity={0.2}
        backdropColor={Colors.shadow}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <View style={styles.indicator} />
          <Text style={[styles.loginText, { alignSelf: "center" }]}>
            Reset Password
          </Text>

          {/* Password reset fields based on the state */}
          {showPasswordFields ? (
            <Animated.View
              entering={FadeInDown.delay(50)
                .duration(500)
                .springify()
                .damping(80)
                .stiffness(200)}
              style={[styles.passwordFields]}
            >
              {/* New password fields */}
              <Text style={styles.label}>New Password</Text>
              <TextInput
                placeholder="Enter new password"
                value={newPassword}  // Bind new password state
                onChangeText={setNewPassword}
                secureTextEntry
                style={styles.input}
              />
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm new password"
                value={confirmPassword}  // Bind confirm password state
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
              />
              {/* Submit button for resetting password */}
              <Button
                title="Submit"
                onPress={() => Alert.alert("Password Updated!")}  // Show alert after password update
                titleColor={Colors.white}
                bg={Colors.mainColor}
                radius={radius.small}
                width={"100%"}
              />
            </Animated.View>
          ) : (
            <>
              {/* Email input for password reset */}
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                value={email}  // Bind email state
                onChangeText={(e) => setEmail(e)}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
              {/* Button for initiating password reset */}
              <Button
                title="Reset Password"
                onPress={handlePasswordReset}  // Call password reset function
                titleColor={Colors.white}
                bg={Colors.mainColor}
                radius={radius.small}
                width={"100%"}
              />
            </>
          )}
        </Animated.View>
      </Modal>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  // Styles for the container, inputs, and buttons are defined here
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
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
  label: { fontSize: Fonts.regular, color: Colors.text, marginBottom: 2 },
  forgotPass: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
  },
  passText: { color: Colors.mainColor, textDecorationLine: "underline" },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  passwordFields: { marginTop: 20 },
  noAccount: { color: Colors.red, textDecorationLine: "underline" },
  indicator: {
    height: 8,
    width: 50,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: Colors.mainColor,
  },
});
