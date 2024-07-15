import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { sharedStyle } from "@/constants/shared.style";
import { useSQLiteContext } from "expo-sqlite";
import {
  getCash_sell,
  getCustomers,
  getExpense,
  getSuppliers,
} from "@/databases/Database";
import { currency } from "@/global/currency";

const Dashboard = () => {
  const [customers, setCustomers] = useState<number>(0);
  const [suppliers, setSuppliers] = useState<number>(0);
  const [cashSell, setCashSell] = useState<any>(0);
  const [expense, setExpense] = useState<any>(0);
  const db = useSQLiteContext();
  const allStatuses = [
    {
      text: "Total Customers",
      icon: require("../../assets/images/DUser.png"),
      quantity: customers,
      bg_color: Colors.lavender,
    },
    {
      text: "Total Supplier",
      icon: require("../../assets/images/DHouse.png"),
      quantity: suppliers,
      bg_color: Colors.purpleHalf,
    },
    {
      text: "Total Cash",
      icon: require("../../assets/images/DMoney.png"),
      amount: `${cashSell}`,
      bg_color: Colors.VeroneseGreen,
    },
    {
      text: "Total Expenses",
      icon: require("../../assets/images/DDollar.png"),
      amount: `${expense}`,
      bg_color: Colors.OrangeRed,
      color: Colors.red,
    },
  ];

  useEffect(() => {
    async function customers() {
      const customers = await getCustomers(db);
      const suppliers = await getSuppliers(db);
      const cash_sell = await getCash_sell(db);
      const expense = await getExpense(db);
      setCustomers(customers?.length);
      setSuppliers(suppliers?.length);
      const totalSaleAmount = cash_sell?.reduce(
        (sum: number, record: any) => sum + record?.collectedAmount,
        0
      );
      const totalExpenseAmount = expense?.reduce(
        (sum: number, record: any) => sum + record?.amount,
        0
      );
      setCashSell(totalSaleAmount);
      setExpense(totalExpenseAmount);
    }
    customers();
  }, [cashSell, expense]);

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
              {item?.amount ? currency : null}
              {item?.amount || item?.quantity}
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
