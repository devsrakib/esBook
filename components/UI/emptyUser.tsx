import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

const EmptyUser = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
      }}
    >
      <FontAwesome5 name="user-alt-slash" size={60} color={Colors.lavender} />
      <Text style={{ fontSize: 20, color: Colors.text }}>{text}</Text>
    </View>
  );
};

export default EmptyUser;
