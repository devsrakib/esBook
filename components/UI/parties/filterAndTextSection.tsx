import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Filter from "./filter";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

const FilterAndTextSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textGreen}>
        Will Receive/ <Text style={styles.textRed}>Will Gave</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  textGreen: {
    fontSize: Fonts.medium,
    color: Colors.green,
  },
  textRed: {
    color: Colors.red,
  },
});

export default FilterAndTextSection;
