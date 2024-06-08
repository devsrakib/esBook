import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "@/components/UI/header/Header";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialTab from "@/routers/MaterialTab";

const addNewParties = () => {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header
        children="Add New Parties"
        textColor={Colors.white}
        backgroundColor={Colors.mainColor}
      />
      <MaterialTab />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default addNewParties;
