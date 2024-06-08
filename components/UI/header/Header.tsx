import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GoBack from "./GoBack";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

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
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GoBack color={Colors.white} />
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
  },
  text: {
    fontSize: Fonts.medium,
    fontWeight: "500",
  },
});

export default Header;
