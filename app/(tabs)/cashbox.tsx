import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { headerHeightWidth } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Dashboard from "@/components/UI/cashbox/Dashboard";

const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Cashbox</Text>
      </View>
      <Dashboard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: headerHeightWidth.headerH,
    backgroundColor: Colors.mainColor,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontWeight: "500",
    fontSize: Fonts.large,
    color: Colors.white,
  },
});

export default Page;
