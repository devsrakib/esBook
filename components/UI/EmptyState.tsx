import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Animated, { ZoomIn } from "react-native-reanimated";

type EmptyStateProps = {
  icon?:
    | "search"
    | "key"
    | "push"
    | "map"
    | "filter"
    | "at"
    | "link"
    | "image"
    | "text"
    | "alert"
    | "checkbox"
    | "menu"
    | "radio"
    | "timer"
    | "close"
    | "checkmark"
    | "close-circle"
    | "close-circle-outline"
    | "cube-outline"
    | "person";
  iconSize?: number;
  color?: string;
  message: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "search",
  message,
  iconSize = 50,
  color = Colors.gray,
}) => {
  return (
    <Animated.View
      entering={ZoomIn.delay(100)
        .duration(400)
        .damping(60)
        .springify()
        .stiffness(180)}
      style={styles.container}
    >
      <Ionicons name={icon} size={iconSize} color={color} />
      <Text style={[styles.message, { color }]}>{message}</Text>
    </Animated.View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  message: {
    fontSize: Fonts.medium,
    marginTop: 10,
    textAlign: "center",
  },
});
