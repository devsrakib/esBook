import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { sharedStyle } from "@/constants/shared.style";
import { Fonts } from "@/constants/Fonts";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchCashSell } from "@/redux/features/cashboxDashboard/getCashSellSlice";
import { fetchDeposit } from "@/redux/features/cashboxDashboard/getDepositSlice";
import { fetchExpense } from "@/redux/features/cashboxDashboard/getExpenseSlice";
import { fetchWithdraw } from "@/redux/features/cashboxDashboard/getWithdrawSlice";

const Dashboard = ({ setCurrentCash }: { setCurrentCash: Function }) => {
  const dispatch = useAppDispatch();

  // Fetch data
  useEffect(() => {
    dispatch(fetchCashSell());
    dispatch(fetchDeposit());
    dispatch(fetchExpense());
    dispatch(fetchWithdraw());
  }, [dispatch]);

  // Selectors
  const { cashSells, loading: cashLoading } = useAppSelector(state => state.getCashSell);
  const { deposit } = useAppSelector(state => state.getDeposit);
  const { expense } = useAppSelector(state => state.getExpense);
  const { withdraw: withdrawData } = useAppSelector(state => state.getWithdraw);

  // Memoized Calculations
  const { currentCash, todaySell, todayReceive, expenseAmount, withdraw } = useMemo(() => {
    const cash = cashSells?.data?.reduce((sum, record) => sum + (record?.collected_amount || 0), 0) || 0;
    const todaySell = cashSells?.data?.reduce((sum, record) => sum + (record?.sell_amount || 0), 0) || 0;
    const todayReceive = deposit?.data?.reduce((sum, record) => sum + (record?.amount || 0), 0) || 0;
    const expenses = expense?.data?.reduce((sum, record) => sum + (record?.amount || 0), 0) || 0;
    const withdraw = withdrawData?.data?.reduce((sum, record) => sum + (record?.amount || 0), 0) || 0;

    const currentCash = cash + todayReceive - expenses - withdraw;

    return { currentCash, todaySell, todayReceive, expenseAmount: expenses, withdraw };
  }, [cashSells, deposit, expense, withdrawData]);

  // Data for UI
  const data = useMemo(
    () => [
      {
        text: "Current Cash",
        amount: cashLoading ? 0 : currentCash,
        icon: require("../../../assets/images/cash.png"),
        color: Colors.mainColor,
        textColor: Colors.mainColor,
      },
      {
        text: "Today Sales",
        amount: todaySell,
        icon: require("../../../assets/images/cart.png"),
        color: Colors.orange,
        textColor: Colors.orange,
      },
      {
        text: "Today I Receive",
        amount: todayReceive,
        icon: require("../../../assets/images/sales.png"),
        color: Colors.green,
        textColor: Colors.green,
      },
      {
        text: "Today I Gave",
        amount: expenseAmount,
        icon: require("../../../assets/images/coin.png"),
        color: Colors.red,
        textColor: Colors.red,
      },
    ],
    [cashLoading, currentCash, todaySell, todayReceive, expenseAmount]
  );

  // Reset cash at midnight
  useEffect(() => {
    const resetAtMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setCurrentCash(0);
      }
    };

    const intervalId = setInterval(resetAtMidnight, 60000); // Check every minute
    return () => clearInterval(intervalId); // Cleanup
  }, [setCurrentCash]);

  return (
    <View style={[sharedStyle.grid]}>
      {data.map((d, i) => (
        <Animated.View
          entering={FadeInDown.delay(i * 50).duration(300).damping(80).springify()}
          key={i}
          style={styles.subContainer}
        >
          <View style={styles.textCon}>
            <Text style={styles.text1}>{d.text}</Text>
            <Text style={[styles.textAmount, { color: d.textColor }]}>
              ${d.amount.toLocaleString("en-US") || "0"}
            </Text>
          </View>
          <View style={[styles.imgCon, { backgroundColor: d.color }]}>
            <Image style={styles.img} source={d.icon} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    width: "48.5%",
    backgroundColor: Colors.white,
    borderRadius: radius.medium,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
    height: 80,
  },
  imgCon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  img: {
    resizeMode: "contain",
    width: 28,
    height: 28,
  },
  textCon: {
    flex: 1,
    gap: 5,
  },
  text1: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  textAmount: {
    fontSize: Fonts.large,
    fontWeight: "700",
  },
});

export default Dashboard;
