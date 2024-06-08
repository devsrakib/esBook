import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Header from "@/components/UI/header/Header";
import { radius } from "@/constants/sizes";
import MaterialTab from "@/routers/MaterialTab";
import MoneySection from "@/components/UI/Collection_component/MoneySection";

const customScreen = Dimensions.get("window").width;
const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header
        children="Collection"
        textColor={Colors.white}
        backgroundColor={Colors.mainColor}
      />
      {/* main body section */}
      <View style={styles.bodySection}>
        <MoneySection />
        <MaterialTab />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bodySection: {
    backgroundColor: Colors.mainColor,
    height: 300,
    borderBottomRightRadius: radius.regular,
    borderBottomLeftRadius: radius.regular,
    paddingHorizontal: 20,
  },
});

export default Page;
