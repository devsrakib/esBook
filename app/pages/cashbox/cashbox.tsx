import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { headerHeightWidth } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Dashboard from "@/components/UI/cashbox/Dashboard";
import CashboxFeature from "@/components/UI/cashbox/CashboxFeature";

export const Cashbox = () => {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Cashbox</Text>
        </View>
        <View style={styles.bodySection}>
          <Dashboard />
          <CashboxFeature />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
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
  bodySection: {
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 20,
  },
});

export default Cashbox;
