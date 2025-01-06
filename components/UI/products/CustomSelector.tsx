

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

// Type definitions for the component props
type Props = {
  toggleDropdown: (type: "category" | "supplier") => void;
  category: { id: string; title: string };
  supplier: { id: string; name: string };
};

const CustomSelector = ({ toggleDropdown, category, supplier }: Props) => {
  return (
    <View style={styles.selectContainer}>
      {/* Category Selector */}
      <View style={styles.selector}>
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          onPress={() => toggleDropdown("category")}
          style={styles.dropdownButton}
        >
          <Text
            style={[
              styles.dropdownText,
              {
                color: category?.title ? Colors.mainColor : Colors.text,
                fontWeight: category?.title ? "bold" : "normal",
              },
            ]}
          >
            {category?.title || "Select Category"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Supplier Selector */}
      <View style={styles.selector}>
        <Text style={styles.label}>Supplier</Text>
        <TouchableOpacity
          onPress={() => toggleDropdown("supplier")}
          style={styles.dropdownButton}
        >
          <Text
            style={[
              styles.dropdownText,
              {
                color: supplier?.name ? Colors.mainColor : Colors.text,
                fontWeight: supplier?.name ? "bold" : "normal",
              },
            ]}
          >
            {supplier?.name || "Select Supplier"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomSelector;

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: "row",
    gap: 10,
  },
  selector: {
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
