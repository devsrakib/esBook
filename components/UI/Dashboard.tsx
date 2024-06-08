import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { sharedStyle } from "@/constants/shared.style";

const Dashboard = () => {
  const allStatuses = [
    {
      text: "Total Customers",
      icon: require("../../assets/images/DUser.png"),
      amount: 1200,
      bg_color: Colors.lavender,
    },
    {
      text: "Total Supplier",
      icon: require("../../assets/images/DHouse.png"),
      amount: 1200,
      bg_color: Colors.purpleHalf,
    },
    {
      text: "Total Cash",
      icon: require("../../assets/images/DMoney.png"),
      amount: 1200,
      bg_color: Colors.VeroneseGreen,
    },
    {
      text: "Total Expenses",
      icon: require("../../assets/images/DDollar.png"),
      amount: 1200,
      bg_color: Colors.OrangeRed,
      color: Colors.red,
    },
  ];

  return (
    <View style={sharedStyle.grid}>
      {allStatuses.map((item, index) => {
        return (
          <View key={index} style={[styles.container]}>
            <View style={[styles.logoCon, { backgroundColor: item?.bg_color }]}>
              <Image source={item?.icon} style={styles.logo} />
            </View>
            <Text style={styles.text}>{item?.text}</Text>
            <Text style={[styles.amount, { color: item?.color }]}>
              ${item?.amount}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: radius.small,
    width: "48.5%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  logoCon: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: Colors.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {},
  text: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  amount: {
    fontSize: Fonts.medium,
    fontWeight: "bold",
  },
});
export default Dashboard;
