import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Fonts } from "@/constants/Fonts";
import { Link, Stack, useRouter } from "expo-router";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import _ from "lodash";
import BottomToast from "@/components/UI/shared/CustomModal";

// Custom hook for managing login state
const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>({});
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const handleInput = useCallback(
    _.debounce((e) => setEmail(e), 300),
    []
  );

  const login = async () => {
    const formData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/v1/user/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const { access, refresh } = response?.data?.token;
        await AsyncStorage.setItem("access_token", access);
        await AsyncStorage.setItem("refresh_token", refresh);
        if (access) {
          router.push("/(tabs)");
        }
      }
    } catch (error: any) {
      const errorData = error?.response?.data;
      if (errorData?.errors) {
        const firstKey = Object.keys(errorData?.errors)[0];
        setErrorMessage(errorData?.errors[firstKey][0]);
        setIsError(true);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return {
    email,
    password,
    setPassword,
    handleInput,
    login,
    errorMessage,
    isError,
  };
};

const LoginScreen = () => {
  const { setPassword, handleInput, login, errorMessage, isError } = useLogin();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalHeight = useSharedValue(200);

  const router = useRouter();
  useEffect(() => {
    modalHeight.value = withTiming(showPasswordFields ? 400 : 260, {
      duration: 500,
    });
  }, [showPasswordFields]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: modalHeight.value,
  }));

  const handlePasswordReset = async () => {
    setShowPasswordFields(true);
  };

  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 50,
        }}
      />
      <View style={styles.inputFieldCon}>
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
              // value={username}
              onChangeText={handleInput}
              autoCapitalize="none"
            />
          </Animated.View>
        </View>
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
              // value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </Animated.View>
        </View>
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
        <Animated.View
          entering={FadeInDown.delay(800)
            .springify()
            .damping(80)
            .stiffness(200)}
          style={{ width: "100%" }}
        >
          <Button
            title="Login"
            onPress={() => login()}
            titleColor={Colors.white}
            bg={Colors.mainColor}
            radius={radius.small}
            width={"90%"}
          />
        </Animated.View>
        <Link href={"/pages/signUp/signUp"} asChild>
          <TouchableOpacity>
            <Text style={styles.noAccount}>I don't have an account</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        backdropOpacity={0.2}
        backdropColor={Colors.shadow}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <View style={styles.indicator} />
          <Text style={[styles.loginText, { alignSelf: "center" }]}>
            Reset Password
          </Text>
          {showPasswordFields ? (
            <Animated.View
              entering={FadeInDown.delay(50)
                .duration(500)
                .springify()
                .damping(80)
                .stiffness(200)}
              style={[styles.passwordFields]}
            >
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
          ) : (
            <>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={(e) => setEmail(e)}
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
            </>
          )}
        </Animated.View>
      </Modal>
      <BottomToast
        message={errorMessage}
        visible={isError}
        bg_color={Colors.red}
      />
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
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
