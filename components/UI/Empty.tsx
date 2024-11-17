import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Empty = ({ text, icon }: { text: string, icon: any }) => {
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
{icon}
      <Text style={{ fontSize: 20, color: Colors.text }}>{text}</Text>
    </View>
  );
};

export default Empty;
