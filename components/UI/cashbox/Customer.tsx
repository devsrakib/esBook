import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";

const Customer = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imgCon}>
        {/* <Image /> */}
        <FontAwesome name="user-secret" size={24} color={Colors.text} />
      </View>
      <View style={styles.textCon}>
        <Text style={styles.text1}>Leslie Allexandra</Text>
        <Text style={styles.text2}>3 jun,2024</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
  imgCon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  textCon: {
    flex: 1,
  },
  text1: {
    fontSize: Fonts.medium,
    fontWeight: "500",
    color: Colors.darkCharcoal,
    marginBottom: 5,
  },
  text2: {
    fontSize: Fonts.small,
    color: Colors.text,
  },
});
export default Customer;
