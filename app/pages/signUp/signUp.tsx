import React, { useState, useEffect } from "react";
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
import { Link, Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  FadeInDown,
} from "react-native-reanimated";

// Define type for the fields
type FieldKeys = "name" | "email" | "username" | "password";

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  // Initialize shared values for animations
  const fieldYPositions: Record<FieldKeys, Animated.SharedValue<number>> = {
    name: useSharedValue(20),
    email: useSharedValue(20),
    username: useSharedValue(20),
    password: useSharedValue(20),
  };

  const fieldOpacities: Record<FieldKeys, Animated.SharedValue<number>> = {
    name: useSharedValue(0),
    email: useSharedValue(0),
    username: useSharedValue(0),
    password: useSharedValue(0),
  };

  useEffect(() => {
    const animateFields = async () => {
      const fields: FieldKeys[] = ["name", "email", "username", "password"];

      fields.forEach((field, index) => {
        fieldOpacities[field].value = withDelay(
          index * 100,
          withTiming(1, { duration: 500 })
        );
        fieldYPositions[field].value = withDelay(
          index * 100,
          withTiming(0, { duration: 500 })
        );
      });
    };

    animateFields();
  }, []);

  const handleChange = (key: FieldKeys, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const signup = async () => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/v1/users/register/",
        formData
      );
      if (response.status === 201) {
        Alert.alert("Signup Successful", "Welcome!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Signup Failed", "Please check your inputs and try again.");
    }
  };

  const { top } = useSafeAreaInsets();

  const getAnimatedStyle = (field: FieldKeys) =>
    useAnimatedStyle(() => ({
      opacity: fieldOpacities[field].value,
      transform: [{ translateY: fieldYPositions[field].value }],
    }));

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header
        children="Sign Up"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />
      <View style={styles.inputFieldCon}>
        <Animated.Text
          entering={FadeInDown.delay(50)
            .duration(200)
            .damping(80)
            .springify()
            .stiffness(200)}
          style={[styles.signupText]}
        >
          Sign Up
        </Animated.Text>

        <Animated.View
          style={[styles.inputAndLabelCon, getAnimatedStyle("name")]}
        >
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
            autoCapitalize="words"
          />
        </Animated.View>

        <Animated.View
          style={[styles.inputAndLabelCon, getAnimatedStyle("email")]}
        >
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Animated.View>

        <Animated.View
          style={[styles.inputAndLabelCon, getAnimatedStyle("username")]}
        >
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={formData.username}
            onChangeText={(text) => handleChange("username", text)}
            autoCapitalize="none"
          />
        </Animated.View>

        <Animated.View
          style={[styles.inputAndLabelCon, getAnimatedStyle("password")]}
        >
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
        </Animated.View>

        <Button
          title="Sign Up"
          onPress={signup}
          titleColor={Colors.white}
          bg={Colors.mainColor}
          radius={radius.small}
          width={"90%"}
        />
        <Link href={"/pages/login/Login"} asChild>
          <TouchableOpacity>
            <Text>I have an account</Text>
          </TouchableOpacity>
        </Link>
      </View>
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
  },
  signupText: {
    fontSize: Fonts.large,
    fontWeight: "600",
    color: Colors.mainColor,
    marginVertical: 20,
  },
  inputAndLabelCon: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: Fonts.regular,
    color: Colors.text,
    marginBottom: 2,
  },
});

export default SignupScreen;
