import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Header from "../../../components/UI/header/Header";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddProduct = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 200,
        }}
      />
      <Header
        children="Add product"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
});
