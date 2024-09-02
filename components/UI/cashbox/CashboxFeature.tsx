import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import Divider from "../Divider";
import { Fonts } from "@/constants/Fonts";
import Feature from "./Feature";
import { IFeature } from "@/types/interfaces/feature.interface";
import DatePicker from "../DatePicker";
//@ts-ignore
import CalendarPicker from "react-native-calendar-picker";
import {
  getCash_buy,
  getCash_sell,
  getDeposit,
  getExpense,
  getWithdraw,
} from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import FormatDate from "@/utils/FormatDate";

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
  const [selectedStartDate, setSelectedStartDate] =
    useState<string>("DD/MM/YYYY");
  const [selectedEndDate, setSelectedEndDate] = useState<string>("DD/MM/YYYY");
  const [selected, setSelected] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());

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
      // const cash = await getCash_sell(db);
      const startDate = selectedStartDate;
      const endDate = selectedEndDate;
      const cashData = await getCash_sell(db);
      const filteredCashData =
        !startDate && !endDate
          ? cashData
          : cashData?.filter((item: any) => {
              const createdAt = FormatDate(item?.createdAt);
              return createdAt >= startDate && createdAt <= endDate;
            });
      const deposit = await getDeposit(db);
      const withdraw = await getWithdraw(db);
      const expense = await getExpense(db);
      const cash_buy = await getCash_buy(db);
      const due = (await getCash_sell(db)).filter(
        (item: any) => item?.dueAmount > 0
      );
      setGetAllCashSell(filteredCashData);
      setDeposit(deposit);
      setWithdraw(withdraw);
      setExpense(expense);
      setDue(due);
      setCashBuy(cash_buy);
      console.log(filteredCashData, ":::::::");
    }
    getCash();
  }, [selectedStartDate, selectedEndDate]);

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

  const onDateChangeData = (date: any, type: any) => {
    // console.log(date);
    // if (date) {
    //   setDate(date);
    // }

    const newDate = JSON.stringify(date);
    const newDate1 = newDate.substring(1, newDate.length - 1);
    const dates = newDate1.split("T");
    const date1 = dates[0].split("-");
    const day = date1[2];
    const month = date1[1];
    const year = date1[0];

    if (type == "END_DATE") {
      if (day == undefined) {
        setSelectedEndDate("DD/MM/YYYY");
      } else {
        setSelectedEndDate(day + "/" + month + "/" + year);
      }
    } else {
      setSelectedStartDate(day + "/" + month + "/" + year);
      setSelectedEndDate("DD/MM/YYYY");
    }
  };

  const selectedDates = !selectedStartDate || !selectedEndDate;
  console.log(selectedDates);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.text1}>Cashbox Featured</Text>
        {/* <DatePicker
          background={Colors.white}
          iconSite="right"
          iconColor={Colors.mainColor}
          iconSize={18}
          date={date}
          setDate={setDate}
        /> */}

        <TouchableOpacity
          style={styles.dateSelectorButton}
          onPress={() => setSelected(!selected)}
        >
          <Text>
            {selectedDates ? (
              ""
            ) : (
              <Text>
                {" "}
                {selectedStartDate} -- {selectedEndDate}
              </Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dateContainer}>
        {(selected || selectedEndDate !== "DD/MM/YYYY") && (
          <CalendarPicker
            startFromMonday={true}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#00ffff"
            selectedDayTextColor="#7300e6"
            minDate={new Date(2024, 1, 1)}
            maxDate={new Date(2026, 6, 3)}
            onDateChange={onDateChangeData}
            allowRangeSelection={true}
            width={Dimensions.get("window").width - 30}
          />
        )}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  dateSelectorButton: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 5,
    borderRadius: radius.small,
  },
  dateContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default CashboxFeature;
