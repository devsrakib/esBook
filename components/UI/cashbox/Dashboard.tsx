import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { sharedStyle } from "@/constants/shared.style";
import { Fonts } from "@/constants/Fonts";
import { useSQLiteContext } from "expo-sqlite";
import {
  CashBuyData,
  DepositData,
  ExpenseData,
  getCash_buy,
  getCash_sell,
  getDeposit,
  getExpense,
  getWithdraw,
  WithdrawData,
} from "@/databases/Database";

const Dashboard = ({ setCurrentCash }: { setCurrentCash: Function }) => {
  const [currentCashAmount, setCurrentCashAmount] = useState<number>(0);
  const [collectedAmount, setCollectedAmount] = useState<any>([]);
  const [deposit, setDeposit] = useState<DepositData[]>([]);
  const [todayIReceive, setTodayIReceive] = useState(0);
  const [todayISells, setTodayISells] = useState(0);
  const [todayIGave, setTodayIGave] = useState(0);
  const [cashBuy, setCashBuy] = useState<CashBuyData[]>([]);
  const [withdraw, setWithdraw] = useState<WithdrawData[]>([]);
  const [expense, setExpense] = useState<ExpenseData[]>([]);

  const data = useMemo(
    () => [
      {
        text: "Current Cash",
        amount: currentCashAmount,
        icon: require("../../../assets/images/cash.png"),
        color: Colors.mainColor,
        textColor: Colors.mainColor,
      },
      {
        text: "Today Sales",
        amount: todayISells,
        icon: require("../../../assets/images/cart.png"),
        color: Colors.orange,
        textColor: Colors.orange,
      },
      {
        text: "Today i Receive",
        amount: todayIReceive,
        icon: require("../../../assets/images/sales.png"),
        color: Colors.green,
        textColor: Colors.green,
      },
      {
        text: "Today I Gave",
        amount: todayIGave,
        icon: require("../../../assets/images/coin.png"),
        color: Colors.red,
        textColor: Colors.red,
      },
    ],
    [currentCashAmount, todayISells, todayIReceive, todayIGave]
  );

  const db = useSQLiteContext();
  useEffect(() => {
    async function cash() {
      const cash = await getCash_sell(db);
      const deposit = await getDeposit(db);
      const cashBuy = await getCash_buy(db);
      const withdraw = await getWithdraw(db);
      const expense = await getExpense(db);
      setWithdraw(withdraw as WithdrawData[]);
      setExpense(expense as ExpenseData[]);
      setCashBuy(cashBuy as CashBuyData[]);
      setDeposit(deposit as DepositData[]);
      setCollectedAmount(cash);
    }
    cash();
  }, []);

  useEffect(() => {
    const totalSaleAmount = collectedAmount?.reduce(
      (sum: number, record: any) => sum + record?.saleAmount,
      0
    );
    const totalCollectedAmount = collectedAmount?.reduce(
      (sum: number, record: any) => sum + record?.collectedAmount,
      0
    );
    const totalDeposit = deposit?.reduce(
      (sum: number, record: any) => sum + record?.amount,
      0
    );
    const totalCashBuy = cashBuy?.reduce(
      (sum: number, record: any) => sum + record?.amount,
      0
    );
    const totalWithdraw = expense?.reduce(
      (sum: number, record: any) => sum + record?.amount,
      0
    );
    const totalExpense = withdraw?.reduce(
      (sum: number, record: any) => sum + record?.amount,
      0
    );
    setCurrentCashAmount(
      totalCollectedAmount + totalDeposit - (totalExpense + totalWithdraw)
    );
    setCurrentCash(totalSaleAmount + totalDeposit);
    setTodayIReceive(totalDeposit);
    setTodayISells(totalSaleAmount);
    setTodayIGave(totalCashBuy + totalExpense + totalWithdraw);
  }, [collectedAmount, deposit, cashBuy, withdraw, expense]);

  // console.log(sellAmount);
  useEffect(() => {
    const resetAtMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setCurrentCashAmount(0);
        setCurrentCash(0);
        setTodayIReceive(0);
        setTodayISells(0);
        setTodayIGave(0);
      }
    };

    const intervalId = setInterval(resetAtMidnight, 60000); // Check every minute

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <View style={[sharedStyle.grid, { marginTop: 14 }]}>
      {data?.map((d, i) => {
        return (
          <View key={i} style={styles.subContainer}>
            <View style={styles.textCon}>
              <Text style={styles.text1}>{d?.text}</Text>
              <Text style={[styles.textAmount, { color: d?.textColor }]}>
                ${d?.amount?.toLocaleString("en-US") || "0"}
              </Text>
            </View>
            <View style={[styles.imgCon, { backgroundColor: d?.color }]}>
              <Image style={styles.img} source={d?.icon} />
            </View>
          </View>
        );
      })}
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
    // width:
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
