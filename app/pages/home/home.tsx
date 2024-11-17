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
          leftBgColor={Colors.mainColor}
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
        <CustomerAndSupplierList />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    gap: 15,
  },
  defaultContainer: {
    flexDirection: "column",
    gap: 20,
  },
  tabletContainer: {
    flexDirection: "row",
    flex: 1,
    gap: 20,
  },
});

export default Home;
