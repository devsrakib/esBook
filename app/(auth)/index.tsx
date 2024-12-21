

import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  interpolate,
  FadeInDown,
} from "react-native-reanimated";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/components/UI/Button";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import useImagePicker from "@/utils/UseImagePicker";
import { Fonts } from "@/constants/Fonts";
import SignupScreen from "./signUp/signUp";

const { width, height } = Dimensions.get("window");

export default function CreateOwnerProfile() {
  const { bottom, top } = useSafeAreaInsets();
  const [profile, setProfileData] = useState({});
  const { selectedImage, pickImage } = useImagePicker();

  // Shared values for animations
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(20);
  const buttonScale = useSharedValue(1);
  const inputAnimations = Array(6)
    .fill(0)
    .map(() => useSharedValue(0));

  // Start animations with delays on mount
  useEffect(() => {
    formOpacity.value = withTiming(1, { duration: 500 });
    formTranslateY.value = withSpring(0, { damping: 10, stiffness: 90 });

    // Sequential animation for inputs
    inputAnimations.forEach((input, index) => {
      input.value = withDelay(50 * index, withSpring(1, { damping: 15 }));
    });
  }, []);

  // Animated styles for form and button
  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleInputChange = (value: any, key: any) => {
    setProfileData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleCreateProfile = async () => {
    Alert.alert("Success", "Profile created successfully!");
  };

  return (
    <View style={[styles.container]}>
      <SignupScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor,
  },
})