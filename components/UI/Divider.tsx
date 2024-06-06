import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const Divider = ({ width, height }: { width: any; height: number }) => {
  return (
    <View
      style={{
        height: height,
        backgroundColor: Colors.border,
        width: width,
      }}
    />
  );
};
export default Divider;
