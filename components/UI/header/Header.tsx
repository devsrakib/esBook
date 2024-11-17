import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GoBack from "./GoBack";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
<<<<<<< HEAD
import { LinearGradient } from "expo-linear-gradient";
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

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
<<<<<<< HEAD
    <LinearGradient
      colors={["#168F88", "#006B60", "#4D89A1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <GoBack color={Colors.white} />
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </LinearGradient>
=======
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GoBack color={Colors.white} />
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </View>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
