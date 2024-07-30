import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { headerHeightWidth, radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Dashboard from "@/components/UI/cashbox/Dashboard";
import CashboxFeature from "@/components/UI/cashbox/CashboxFeature";
import { Link } from "expo-router";

export const Cashbox = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [currentCash, setCurrentCash] = useState<number>(0);
  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Cashbox</Text>
          <Link
            href={{
              pathname: "/pages/cashbox/matchCashbox",
              params: {
                amount: currentCash,
              },
            }}
            asChild
          >
            <TouchableOpacity style={styles.matchCashbox}>
              <Image
                style={styles.matchLogo}
                source={require("../../../assets/images/calculator.png")}
              />
              <Text style={styles.matchText}>Match Cashbox</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.bodySection}>
          <Dashboard setCurrentCash={setCurrentCash} />
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
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 20,
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
