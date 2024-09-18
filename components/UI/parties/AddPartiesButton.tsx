import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

const AddPartiesButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.navigate("/pages/parties/addNewParties")}
      style={styles.button}
    >
      <AntDesign name="plus" size={18} color={Colors.white} />
      <Text style={styles.buttonText}>Add Parties</Text>
    </TouchableOpacity>
  );
};

export default AddPartiesButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.mainColor,
    alignSelf: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Fonts.medium,
  },
});
