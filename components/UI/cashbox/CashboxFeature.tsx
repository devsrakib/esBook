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
import Modal from "react-native-modal";
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

  const db = useSQLiteContext();

  const feature: IFeature[] = useMemo(
    () => [
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
    ],
    [
      totalCash,
      totalDue,
      totalCashBuy,
      totalExpense,
      totalDeposit,
      totalWithdraw,
    ]
  );

  useEffect(() => {
    const asyncFunction = async () => {
      // const cash = await getCash_sell(db);
      const startDate = selectedStartDate;
      const endDate = selectedEndDate;
      const filteredCashData =
        startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
          ? await getCash_sell(db)
          : (await getCash_sell(db))?.filter((item: any) => {
              const createdAt = FormatDate(item?.createdAt);
              return createdAt >= startDate && createdAt <= endDate;
            });
      const filteredDepositData =
        startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
          ? await getDeposit(db)
          : (await getDeposit(db))?.filter((item: any) => {
              const createdAt = FormatDate(item?.createdAt);
              return createdAt >= startDate && createdAt <= endDate;
            });
      const filterWithdrawData =
        startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
          ? await getWithdraw(db)
          : (await getWithdraw(db))?.filter((item: any) => {
              const createdAt = FormatDate(item?.createdAt);
              return createdAt >= startDate && createdAt <= endDate;
            });
      const filteredExpenseData =
        startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
          ? await getExpense(db)
          : (await getExpense(db))?.filter((item: any) => {
              const createdAt = FormatDate(item?.createdAt);
              return createdAt >= startDate && createdAt <= endDate;
            });
      const filteredCashBuyData =
        startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
          ? await getCash_buy(db)
          : (await getCash_buy(db))?.filter((item: any) => {
              const createdAt = FormatDate(item?.createdAt);
              return createdAt >= startDate && createdAt <= endDate;
            });
      const filteredDueData =
        startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
          ? (await getCash_sell(db)).filter((item: any) => item?.dueAmount > 0)
          : (await getCash_sell(db))
              .filter((item: any) => item?.dueAmount > 0)
              ?.filter((item: any) => {
                const createdAt = FormatDate(item?.createdAt);
                return createdAt >= startDate && createdAt <= endDate;
              });
      setGetAllCashSell(filteredCashData);
      setDeposit(filteredDepositData);
      setWithdraw(filterWithdrawData);
      setExpense(filteredExpenseData);
      setDue(filteredDueData);
      setCashBuy(filteredCashBuyData);
      console.log(filteredCashData, ":::::::");
    };
    asyncFunction();
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
        setSelectedEndDate(`${day}/${month}/${year}`);
      }
    } else {
      setSelectedStartDate(`${day}/${month}/${year}`);
      setSelectedEndDate("DD/MM/YYYY");
    }
  };
  const selectedDates =
    selectedStartDate === "DD/MM/YYYY" && selectedEndDate === "DD/MM/YYYY";

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.text1}>Cashbox Featured</Text>
        <TouchableOpacity
          style={styles.dateSelectorButton}
          onPress={() => setSelected(!selected)}
        >
          <Text>
            {selectedDates
              ? "Select Date Range"
              : `${selectedStartDate} -- ${selectedEndDate}`}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dateContainer}>
        {/* {selected && ( */}
        <Modal
          isVisible={selected}
          onBackButtonPress={() => setSelected(false)}
          onBackdropPress={() => setSelected(false)}
          style={styles.dateModal}
          backdropOpacity={0.7}
        >
          <View style={styles.dateModalContent}>
            <CalendarPicker
              startFromMonday={true}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#00ffff"
              selectedDayTextColor="#7300e6"
              minDate={new Date(2024, 1, 1)}
              maxDate={new Date(2026, 6, 3)}
              onDateChange={onDateChangeData}
              allowRangeSelection={true}
              width={Dimensions.get("window").width - 60}
              weekdays={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
            />
          </View>
        </Modal>
        {/* )} */}
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
  dateModal: {
    height: 400,
  },
  dateModalContent: {
    height: 400,
    backgroundColor: Colors.white,
    borderRadius: radius.small,
  },
});

export default CashboxFeature;
