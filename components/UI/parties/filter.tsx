import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";

const Filter = () => {
  return (
    <TouchableOpacity style={styles.filter}>
      <MaterialCommunityIcons
        name="filter-outline"
        size={16}
        color={Colors.text}
      />
      <Text>Filter</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filter: {
    flexDirection: "row",
    borderRadius: radius.small,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    height: 30,
  },
});

export default Filter;
