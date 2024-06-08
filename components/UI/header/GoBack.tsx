import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { radius } from "@/constants/sizes";
const GoBack = ({ color }: { color: string }) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.back()}>
      <AntDesign name="arrowleft" size={24} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: radius.regular,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GoBack;
