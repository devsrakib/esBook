import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import Header from "@/components/UI/cashbox/Header";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Chip from "@/components/UI/cashbox/Chip";
import ReportCart from "@/components/UI/cashbox/ReportCart";
import {
  getCash_buy,
  getCash_sell,
  getDeposit,
  getExpense,
} from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import NonRelationReportCart from "@/components/UI/cashbox/nonRelationalReportCart";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Empty from "@/components/UI/Empty";
import DueReport from "./dueReport";

const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  const router = useLocalSearchParams();
  const [expenseReport, setExpenseReport] = useState<any>([]);
  const [depositedReport, setDepositedReport] = useState<any>([]);
  const [withdrawReport, setWithdrawReport] = useState<any>([]);
  const [cashSellReport, setCashSellReport] = useState<any>([]);
  const [cashBuyReport, setCashBuyReport] = useState<any>([]);
  const [dueReport, setDueReport] = useState<any>([]);
  const [selectedChip, setSelectedChip] = useState<any>(router?.title);
  const db = useSQLiteContext();
  console.log(router);

  useEffect(() => {
    async function expense() {
      const expense = await getExpense(db);
      const deposit = await getDeposit(db);
      const withdraw = await getDeposit(db);
      const cashSell = await getCash_sell(db);
      const cash_buy = await getCash_buy(db);
      const due = (await getCash_sell(db)).filter(
        (item: any) => item?.dueAmount > 0
      );
      setDueReport(due);
      setExpenseReport(expense);
      setDepositedReport(deposit);
      setWithdrawReport(withdraw);
      setCashSellReport(cashSell);
      setCashBuyReport(cash_buy);
    }
    expense();
  }, []);

  console.log(dueReport?.length);

  const currentData =
    selectedChip === "Expenses"
      ? expenseReport
      : selectedChip === "Deposited"
      ? depositedReport
      : selectedChip === "Withdraw"
      ? withdrawReport
      : selectedChip === "Cash Sell"
      ? cashSellReport
      : selectedChip === "Due"
      ? dueReport
      : selectedChip === "Cash buy" && cashBuyReport;

  // Check if current data is empty
  const isEmpty = currentData?.length === 0;

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
        <View>
          <Chip
            setSelectedChip={setSelectedChip}
            title={router?.title}
            selectedChip={selectedChip}
          />
        </View>
        <View style={{ flex: 1 }}>
          {/* expenseReport?.length === 0 || depositedReport?.length === 0 || withdrawReport?.length === 0 || cashSellReport?.length === 0 || cashBuyReport?.length === 0 ? <Empty text={'No Reports Available'} icon={<MaterialIcons name="hourglass-empty" size={60} color={Colors.text} />}/> : */}
          {isEmpty ? (
            <Empty
              text={"No Reports Available"}
              icon={
                <MaterialIcons
                  name="hourglass-empty"
                  size={60}
                  color={Colors.text}
                />
              }
            />
          ) : (
            <FlatList
              contentContainerStyle={{
                gap: 15,
                paddingTop: selectedChip === "Due" ? 10 : 20,
                paddingBottom: 30,
              }}
              data={currentData}
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
                    ) : selectedChip === "Cash buy" ? (
                      <ReportCart item={item} text="cash buy" />
                    ) : (
                      selectedChip === "Due" && (
                        // <ReportCart item={item} text="Due" />
                        <DueReport where="report" />
                      )
                    )}
                  </Fragment>
                );
              }}
            />
          )}
        </View>
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
    flex: 1,
  },
});

export default Page;
