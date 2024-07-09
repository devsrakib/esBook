import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import Header from "@/components/UI/cashbox/Header";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Chip from "@/components/UI/cashbox/Chip";
import ReportCart from "@/components/UI/cashbox/ReportCart";
import { getCash_sell, getDeposit, getExpense } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import NonRelationReportCart from "@/components/UI/cashbox/nonRelationalReportCart";

const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [expenseReport, setExpenseReport] = useState<any>([]);
  const [depositedReport, setDepositedReport] = useState<any>([]);
  const [withdrawReport, setWithdrawReport] = useState<any>([]);
  const [cashSellReport, setCashSellReport] = useState<any>([]);
  const [selectedChip, setSelectedChip] = useState("");
  const db = useSQLiteContext();
  useEffect(() => {
    async function expense() {
      const expense = await getExpense(db);
      const deposit = await getDeposit(db);
      const withdraw = await getDeposit(db);
      const cashSell = await getCash_sell(db);
      setExpenseReport(expense);
      setDepositedReport(deposit);
      setWithdrawReport(withdraw);
      setCashSellReport(cashSell);
    }
    expense();
  }, []);

  console.log(selectedChip);

  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header title={"Report"} titleColor={Colors.white} height={70} />
      <View style={styles.bodyContainer}>
        <Chip setSelectedChip={setSelectedChip} />
        <FlatList
          contentContainerStyle={{
            gap: 15,
            paddingTop: 20,
            paddingBottom: 30,
          }}
          data={
            selectedChip === "Expenses"
              ? expenseReport
              : selectedChip === "Deposited"
              ? depositedReport
              : selectedChip === "Withdraw"
              ? withdrawReport
              : selectedChip === "Cash Sell"
              ? cashSellReport
              : ""
          }
          renderItem={({ item }) => {
            return (
              <Fragment>
                {selectedChip === "Expenses" ? (
                  <NonRelationReportCart item={item} text="Expense" />
                ) : selectedChip === "Deposited" ? (
                  <NonRelationReportCart item={item} text="Deposited" />
                ) : selectedChip === "Withdraw" ? (
                  <NonRelationReportCart item={item} text="Withdraw" />
                ) : selectedChip === "Cash Sell" ? (
                  <ReportCart item={item} text="cash sell" />
                ) : (
                  <ReportCart />
                )}
              </Fragment>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bodyContainer: {
    paddingTop: 10,
  },
});

export default Page;
