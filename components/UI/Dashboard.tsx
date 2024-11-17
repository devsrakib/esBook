import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
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
import { Link } from "expo-router";
import { IDashboardData } from "@/types/interfaces/home/dashboard.interface";
import Animated, { FadeInDown } from "react-native-reanimated";

const Dashboard = () => {
  const [customers, setCustomers] = useState<number>(0);
  const [suppliers, setSuppliers] = useState<number>(0);
  const [cashSell, setCashSell] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const db = useSQLiteContext();
  const dashboardData: IDashboardData[] = [
    {
      text: "Total Customers",
      icon: require("../../assets/images/DUser.png"),
      quantity: customers,
      bg_color: Colors.lavender,
<<<<<<< HEAD
      link: "/pages/cashbox/allCustomers",
=======
      link: "/pages/parties/parties",
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
    },
    {
      text: "Total Supplier",
      icon: require("../../assets/images/DHouse.png"),
      quantity: suppliers,
      bg_color: Colors.purpleHalf,
<<<<<<< HEAD
      link: "/pages/cashbox/allSuppliers",
=======
      link: "/pages/parties/parties",
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
    },
    {
      text: "Total Cash",
      icon: require("../../assets/images/DMoney.png"),
      amount: `${cashSell?.toLocaleString("en-US") || "0"}`,
      bg_color: Colors.VeroneseGreen,
    },
    {
      text: "Total Expenses",
      icon: require("../../assets/images/DDollar.png"),
      amount: `${expense?.toLocaleString("en-US") || "0"}`,
      bg_color: Colors.OrangeRed,
      color: Colors.red,
    },
  ];

  const { width } = Dimensions.get("window");
  const isTablet = width >= 600;

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

  const CustomTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <View style={sharedStyle.grid}>
      {dashboardData.map((item, index) => {
        const StatusContent = (
          <CustomTouchable
            entering={FadeInDown.delay(index * 50)
              .duration(400)
              .damping(80)
              .springify()}
            activeOpacity={item?.link ? 0.7 : 1}
            key={index}
            style={styles.container}
          >
            <View style={[styles.logoCon, { backgroundColor: item?.bg_color }]}>
              <Image source={item?.icon} style={styles.logo} />
            </View>
            <Text style={styles.text}>{item?.text}</Text>
            <Text style={[styles.amount, { color: item?.color }]}>
              {item?.amount ? currency : null}
              {item?.amount || item?.quantity}
            </Text>
          </CustomTouchable>
        );

        return item?.link ? (
          <Link
            key={index}
            href={{
              //@ts-ignore
              pathname: item?.link,
              params: {
                text: item?.text,
              },
            }}
            asChild
          >
            {StatusContent}
          </Link>
        ) : (
          StatusContent
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    width: "48.5%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
    shadowColor: Colors.shadow,
    elevation: 10,
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
