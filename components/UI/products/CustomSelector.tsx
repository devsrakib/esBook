import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type props = {
  toggleDropdown: () => void;
  category: string;
};
const CustomSelector = ({ toggleDropdown, category }: props) => {
  return (
    <View style={styles.selectCustomer}>
      <View style={styles.categoryAndCustomer}>
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.dropdownButton}
        >
          <Text style={styles.dropdownText}>
            {category || "Select Category"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryAndCustomer}>
        <Text style={styles.label}>Select Supplier</Text>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.dropdownButton}
        >
          <Text style={styles.dropdownText}>
            {category || "Select supplier"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomSelector;

const styles = StyleSheet.create({
  selectCustomer: { flexDirection: "row", gap: 10 },
  categoryAndCustomer: {
    flex: 1,
    gap: 5,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.text,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 3,
    color: Colors.darkCharcoal,
  },
});
