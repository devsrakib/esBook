"use strict";

import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import UserViewHome from "@/components/UI/UserViewHome";
import Chart from "@/components/UI/home/Chart";
import AmountCon from "@/components/UI/AmountCon";
import Dashboard from "@/components/UI/Dashboard";
import CustomerAndSupplierList from "@/components/UI/home/CustomerAndSupplierList";
import { FontAwesome } from "@expo/vector-icons";

const Home = () => {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 600;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <UserViewHome />
        <AmountCon
          bg_image={require("../../../assets/images/amountFrame.png")}
          leftTextColor={Colors.white}
          leftAmountTColor={Colors.white}
          icon1={
            <FontAwesome
              name="money"
              size={isTablet ? 60 : 30}
              color={Colors.white}
            />
          }
          icon2={
            <FontAwesome
              name="money"
              size={isTablet ? 60 : 30}
              color={Colors.white}
            />
          }
        />
        <View
          style={isTablet ? styles.tabletContainer : styles.defaultContainer}
        >
          <View style={{ flex: 1 }}>
            <Dashboard />
          </View>
          <View style={{ flex: 1 }}>
            <Chart />
          </View>
        </View>
        <CustomerAndSupplierList bg={Colors.JazzBerry} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    gap: 15,
  },
  defaultContainer: {
    flexDirection: "column", // Stack components vertically on phones
    padding: 10,
    gap: 20,
  },
  tabletContainer: {
    flexDirection: "row",
    flex: 1,
    gap: 20,
  },
});

export default Home;
