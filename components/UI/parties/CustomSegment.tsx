import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

const CustomSegment = ({
  selectedIndex,
  selectedTabIndex,
}: {
  selectedIndex: number;
  selectedTabIndex: (index: number) => void;
}) => {
  return (
    <View style={styles.navigationCon}>
      <TouchableOpacity
        style={[
          styles.tabs,
          {
            borderBottomColor:
              selectedIndex === 0 ? Colors.white : "transparent",
          },
        ]}
        onPress={() => selectedTabIndex(0)}
      >
        <Text style={styles.navigationText}>Customers</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabs,
          {
            borderBottomColor:
              selectedIndex === 1 ? Colors.white : "transparent",
          },
        ]}
        onPress={() => selectedTabIndex(1)}
      >
        <Text style={styles.navigationText}>Suppliers</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSegment;
const styles = StyleSheet.create({
  navigationCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
    marginBottom: 10,
  },
  navigationText: {
    fontSize: Fonts.medium,
    color: Colors.white,
  },
  tabs: {
    height: 25,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
});
