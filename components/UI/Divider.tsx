import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const Divider = ({
  width,
  height,
  aligns,
}: {
  width: any;
  height: number;
  aligns: any;
}) => {
  return (
    <View
      style={{
        height: height,
        backgroundColor: Colors.border,
        width: width,
        alignSelf: aligns,
      }}
    />
  );
};
export default Divider;
