import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const BottomToast = ({
  message,
  visible,
  duration = 3000,
}: {
  message: string;
  visible: boolean;
  duration?: number;
}) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Show toast
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Hide toast after the duration
      setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, duration);
    }
  }, [visible]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // Slide up from the bottom
  });

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.toastContainer, { transform: [{ translateY }] }]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 40,
    left: width * 0.1,
    width: width * 0.8,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default BottomToast;
