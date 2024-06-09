import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
const AddPhoneBookButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <FontAwesome5 name="address-book" size={18} color={Colors.mainColor} />
      <Text style={styles.text}>Add Phone book</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: Colors.lavender,
    borderRadius: radius.xxxl,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexDirection: "row",
    width: 200,
  },
  text: {
    fontSize: Fonts.medium,
    color: Colors.mainColor,
  },
});
export default AddPhoneBookButton;
