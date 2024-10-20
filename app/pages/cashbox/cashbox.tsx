import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { headerHeightWidth, radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Dashboard from "@/components/UI/cashbox/Dashboard";
import CashboxFeature from "@/components/UI/cashbox/CashboxFeature";
import { Link, Stack } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import Header from "@/components/UI/cashbox/cashbox.header";

export const Cashbox = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [currentCash, setCurrentCash] = useState<number>(0);
  const handleCurrentCash = useCallback((amount: number) => {
    setCurrentCash(amount);
  }, []);
  return (
    <View style={[styles.container]}>
      <ScrollView>
        <Header currentCash={currentCash} />
        <View style={styles.bodySection}>
          <Dashboard setCurrentCash={handleCurrentCash} />
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "500",
    fontSize: Fonts.large,
    color: Colors.white,
  },
  bodySection: {
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 16,
    paddingTop: 15,
  },
  matchCashbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  matchLogo: {
    width: 18,
    height: 18,
  },
  matchText: {
    fontSize: Fonts.regular,
    color: Colors.mainColor,
  },
});

export default Cashbox;
