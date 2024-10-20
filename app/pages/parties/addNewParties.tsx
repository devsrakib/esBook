import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "@/components/UI/header/Header";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialTab from "@/routers/MaterialTab";
import Customers from "./Customers";
import Suppliers from "./Suppliers";

const AddNewParties = () => {
  const { bottom, top } = useSafeAreaInsets();
  const tab: { tabName: string; component: any }[] = [
    { tabName: "Customers", component: Customers },
    { tabName: "Suppliers", component: Suppliers },
  ];
  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 200,
        }}
      />
      <Header
        children="Add New Parties"
        textColor={Colors.white}
        backgroundColor={Colors.mainColor}
      />
      <MaterialTab tab={tab} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
export default AddNewParties;
