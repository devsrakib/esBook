import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import Divider from "../Divider";
import { Fonts } from "@/constants/Fonts";
import Feature from "./Feature";
import { IFeature } from "@/types/interfaces/feature.interface";
import DatePicker from "../DatePicker";
import CalendarPicker from "react-native-calendar-picker";
import {
  getCash_buy,
  getCash_sell,
  getDeposit,
  getExpense,
  getWithdraw,
} from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";

const CashboxFeature = () => {
  const [getAllCashSell, setGetAllCashSell] = useState<any>([]);
  const [deposit, setDeposit] = useState<any>([]);
  const [withdraw, setWithdraw] = useState<any>([]);
  const [totalWithdraw, setTotalWithdraw] = useState<number>(0);
  const [expense, setExpense] = useState<any>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalCash, setTotalCash] = useState<number>(0);
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [due, setDue] = useState<any>([]);
  const [totalDue, setTotalDue] = useState<number>(0);
  const [totalCashBuy, setTotalCashBuy] = useState<number>(0);
  const [cashBuy, setCashBuy] = useState<any>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [selected, setSelected] = useState("");

  const db = useSQLiteContext();
  const feature: IFeature[] = [
    {
      icon: require("../../../assets/images/cashGreen.png"),
      text: "Cash Sell",
      amount: totalCash,
      color: Colors.VeroneseGreen,
      textColor: Colors.green,
    },
    {
      icon: require("../../../assets/images/expense.png"),
      text: "Due",
      amount: totalDue,
      color: Colors.OrangeRed,
      textColor: Colors.red,
      link: "/pages/cashbox/dueReport",
    },
    {
      icon: require("../../../assets/images/expense.png"),
      text: "Cash buy",
      amount: totalCashBuy,
      color: Colors.OrangeRed,
      textColor: Colors.red,
    },
    {
      icon: require("../../../assets/images/expense.png"),
      text: "Expenses",
      amount: totalExpense,
      color: Colors.OrangeRed,
      textColor: Colors.red,
    },
    {
      icon: require("../../../assets/images/cashGreen.png"),
      text: "Deposited",
      amount: totalDeposit,
      color: Colors.VeroneseGreen,
      textColor: Colors.green,
    },
    {
      icon: require("../../../assets/images/expense.png"),
      text: "Withdraw",
      amount: totalWithdraw,
      color: Colors.OrangeRed,
      textColor: Colors.red,
    },
  ];

  useEffect(() => {
    async function getCash() {
      const cash = await getCash_sell(db);
      const deposit = await getDeposit(db);
      const withdraw = await getWithdraw(db);
      const expense = await getExpense(db);
      const cash_buy = await getCash_buy(db);
      const due = (await getCash_sell(db)).filter(
        (item: any) => item?.dueAmount > 0
      );
      setGetAllCashSell(cash);
      setDeposit(deposit);
      setWithdraw(withdraw);
      setExpense(expense);
      setDue(due);
      setCashBuy(cash_buy);
    }
    getCash();
  }, []);

  useEffect(() => {
    const totalCollectedAmount = getAllCashSell?.reduce(
      (sum: number, record: any) => sum + record?.collectedAmount,
      0
    );
    const totalDeposit = deposit?.reduce(
      (sum: number, record: any) => sum + record?.amount,
      0
    );
    const totalWithdraw = withdraw?.reduce(
      (sum: number, record: any) => sum + record?.amount,
      0
    );
    const totalExpense = expense?.reduce(
      (sum: number, record: any) => sum + record?.amount,
      0
    );
    const totalDue = due?.reduce(
      (sum: number, record: any) => sum + record?.dueAmount,
      0
    );
    const total_cash_buy = cashBuy?.reduce(
      (sum: number, record: any) => sum + record?.amount,
      0
    );
    setTotalCash(totalCollectedAmount);
    setTotalDeposit(totalDeposit);
    setTotalWithdraw(totalWithdraw);
    setTotalExpense(totalExpense);
    setTotalDue(totalDue);
    setTotalCashBuy(total_cash_buy);
  }, [getAllCashSell, deposit, withdraw, expense, due, cashBuy]);

  console.log(date, "date");

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {/* <Text style={styles.text1}>Cashbox Featured</Text> */}
        {/* <DatePicker
          background={Colors.white}
          iconSite="right"
          iconColor={Colors.mainColor}
          iconSize={18}
          date={date}
          setDate={setDate}
        /> */}

        <CalendarPicker
          startFromMonday={true}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#00ffff"
          selectedDayTextColor="#7300e6"
          minDate={new Date()}
          maxDate={new Date(2026, 6, 3)}
          onDateChange={() => {}}
          allowRangeSelection={true}
        />
      </View>
      <Divider height={1} width={"100%"} aligns={"center"} />
      <View style={styles.bottomSection}>
        {feature?.map((f, index) => {
          return <Feature key={index.toString()} data={f} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.regular,
    backgroundColor: Colors.white,
  },
  topSection: {
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
    overflow: "scroll",
  },

  bottomSection: {},
  text1: {
    fontSize: Fonts.medium,
    fontWeight: "500",
    color: Colors.darkCharcoal,
  },
});

export default CashboxFeature;
