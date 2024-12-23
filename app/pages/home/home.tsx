import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
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
      <View style={styles.container}>
        {/* User View Component */}
        <UserViewHome />

        {/* AmountCon Component with Props */}
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

        {/* Dashboard and Chart Layout */}
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

        {/* Customer and Supplier List */}
        <CustomerAndSupplierList />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    gap: 15,
  },
  defaultContainer: {
    flexDirection: "column", // Stacks components vertically on phones
    gap: 20,
  },
  tabletContainer: {
    flexDirection: "row", // Arranges components side by side on tablets
    flex: 1,
    gap: 20,
  },
});
