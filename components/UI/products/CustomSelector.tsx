import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type props = {
<<<<<<< HEAD
  toggleDropdown: (text: string) => void;
  category: { id: string; title: string };
  supplier: { id: string; name: string };
};
const CustomSelector = ({ toggleDropdown, category, supplier }: props) => {
=======
  toggleDropdown: () => void;
  category: string;
};
const CustomSelector = ({ toggleDropdown, category }: props) => {
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  return (
    <View style={styles.selectCustomer}>
      <View style={styles.categoryAndCustomer}>
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
<<<<<<< HEAD
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
=======
          onPress={toggleDropdown}
          style={styles.dropdownButton}
        >
          <Text style={styles.dropdownText}>
            {category || "Select Category"}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryAndCustomer}>
        <Text style={styles.label}>Select Supplier</Text>
        <TouchableOpacity
<<<<<<< HEAD
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
            {supplier?.name || "Select supplier"}
=======
          onPress={toggleDropdown}
          style={styles.dropdownButton}
        >
          <Text style={styles.dropdownText}>
            {category || "Select supplier"}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
