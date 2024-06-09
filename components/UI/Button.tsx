import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";

interface buttonProps {
  bg: string;
  titleColor: string;
  title: string;
  radius: number;
  width: any;
  onPress?: () => void;
}

const Button: React.FC<buttonProps> = ({
  bg,
  titleColor,
  title,
  radius,
  width,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.saveButton,
        { backgroundColor: bg, borderRadius: radius, width: width },
      ]}
    >
      <Text style={[styles.buttonText, { color: titleColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 20,
    height: 46,
  },
  buttonText: {
    fontSize: Fonts.large,
  },
});
export default Button;
