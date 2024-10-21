import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { FlipInEasyX } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/header/Header";

const SellerInfo = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />

      <Header
        children="Seller information"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />
    </View>
  );
};

export default SellerInfo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
});
