import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GoBack from "./GoBack";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { LinearGradient } from "expo-linear-gradient";

interface ChildrenProps {
  children: string;
  textColor: string;
  backgroundColor: string;
}
const Header: React.FC<ChildrenProps> = ({
  children,
  textColor,
  backgroundColor,
}) => {
  return (
    <LinearGradient
      colors={[Colors.lightGray, Colors.linearSecond, Colors.linearThird]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <GoBack color={Colors.white} />
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  text: {
    fontSize: Fonts.medium,
    fontWeight: "500",
  },
});

export default Header;
