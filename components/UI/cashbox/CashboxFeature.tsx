// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { radius } from "@/constants/sizes";
// import { Colors } from "@/constants/Colors";
// import Divider from "../Divider";
// import { Fonts } from "@/constants/Fonts";
// import Feature from "./Feature";
// import { IFeature } from "@/types/interfaces/cashBox/feature.interface";
// //@ts-ignore

// import {
//   CashBuyData,
//   DepositData,
//   DueCollectionData,
//   ExpenseData,
//   getCash_buy,
//   getCash_sell,
//   getDeposit,
//   getExpense,
//   getWithdraw,
//   WithdrawData,
// } from "@/databases/Database";
// import { useSQLiteContext } from "expo-sqlite";
// import FormatDate from "@/utils/FormatDate";
// import CalenderModal from "./CalenderModal";
// import Animated, { FadeInDown } from "react-native-reanimated";
// import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
// import { fetchCashSell } from "@/redux/features/cashboxDashboard/getCashSellSlice";
// import { fetchDeposit } from "@/redux/features/cashboxDashboard/getDepositSlice";
// import { fetchExpense } from "@/redux/features/cashboxDashboard/getExpenseSlice";
// import { fetchWithdraw } from "@/redux/features/cashboxDashboard/getWithdrawSlice";

// const CashboxFeature = () => {
//   const [getAllCashSell, setGetAllCashSell] = useState<any[]>([]);
//   const [due, setDue] = useState<DueCollectionData[]>([]);
//   const [totalDue, setTotalDue] = useState<number>(0);
//   const [totalCashBuy, setTotalCashBuy] = useState<number>(0);
//   const [cashBuy, setCashBuy] = useState<CashBuyData[]>([]);
//   const [selectedStartDate, setSelectedStartDate] =
//     useState<string>("DD/MM/YYYY");
//   const [selectedEndDate, setSelectedEndDate] = useState<string>("DD/MM/YYYY");
//   const [selected, setSelected] = useState<boolean>(false);

//   const db = useSQLiteContext();
// const dispatch = useAppDispatch();

//     useEffect(() => {
//       dispatch(fetchCashSell());
//       dispatch(fetchDeposit());
//       dispatch(fetchExpense());
//       dispatch(fetchWithdraw());
//     }, [dispatch]);
  
//     // Selectors
//     const { cashSells, loading: cashLoading } = useAppSelector(state => state.getCashSell);
//     const { deposit } = useAppSelector(state => state.getDeposit);
//     const { expense } = useAppSelector(state => state.getExpense);
//     const { withdraw: withdrawData } = useAppSelector(state => state.getWithdraw);
  
//     // Memoized Calculations
//     const { cash_sells, deposits, expenseAmount, withdraw } = useMemo(() => {
//       const cash = cashSells?.data?.reduce((sum, record) => sum + (record?.collected_amount || 0), 0) || 0;
//       const deposits = deposit?.data?.reduce((sum, record) => sum + (record?.amount || 0), 0) || 0;
//       const expenses = expense?.data?.reduce((sum, record) => sum + (record?.amount || 0), 0) || 0;
//       const withdraw = withdrawData?.data?.reduce((sum, record) => sum + (record?.amount || 0), 0) || 0;
  
//       const cash_sells = cash + deposits - expenses - withdraw;
  
//       return { cash_sells,  deposits, expenseAmount: expenses, withdraw };
//     }, [cashSells, deposit, expense, withdrawData]);




//   const feature: IFeature[] = [
//       {
//         icon: require("../../../assets/images/cashGreen.png"),
//         text: "Cash Sell",
//         amount: cash_sells,
//         color: Colors.VeroneseGreen,
//         textColor: Colors.green,
//       },
//       {
//         icon: require("../../../assets/images/expense.png"),
//         text: "Due",
//         amount: totalDue,
//         color: Colors.OrangeRed,
//         textColor: Colors.red,
//         link: "/pages/cashbox/dueReport",
//       },
//       {
//         icon: require("../../../assets/images/expense.png"),
//         text: "Cash buy",
//         amount: totalCashBuy,
//         color: Colors.OrangeRed,
//         textColor: Colors.red,
//       },
//       {
//         icon: require("../../../assets/images/expense.png"),
//         text: "Expenses",
//         amount: expenseAmount,
//         color: Colors.OrangeRed,
//         textColor: Colors.red,
//       },
//       {
//         icon: require("../../../assets/images/cashGreen.png"),
//         text: "Deposited",
//         amount: deposits,
//         color: Colors.VeroneseGreen,
//         textColor: Colors.green,
//       },
//       {
//         icon: require("../../../assets/images/expense.png"),
//         text: "Withdraw",
//         amount: withdraw,
//         color: Colors.OrangeRed,
//         textColor: Colors.red,
//       },
//     ];

//   // useEffect(() => {
//   //   const asyncFunction = async () => {
//   //     // const cash = await getCash_sell(db);
//   //     const startDate = selectedStartDate;
//   //     const endDate = selectedEndDate;
//   //     const filteredCashData =
//   //       startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
//   //         ? await getCash_sell(db)
//   //         : (await getCash_sell(db))?.filter((item: any) => {
//   //             const createdAt = FormatDate(item?.createdAt);
//   //             return createdAt >= startDate && createdAt <= endDate;
//   //           });
//   //     const filteredDepositData =
//   //       startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
//   //         ? await getDeposit(db)
//   //         : (await getDeposit(db))?.filter((item: any) => {
//   //             const createdAt = FormatDate(item?.createdAt);
//   //             return createdAt >= startDate && createdAt <= endDate;
//   //           });
//   //     const filterWithdrawData =
//   //       startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
//   //         ? await getWithdraw(db)
//   //         : (await getWithdraw(db))?.filter((item: any) => {
//   //             const createdAt = FormatDate(item?.createdAt);
//   //             return createdAt >= startDate && createdAt <= endDate;
//   //           });
//   //     const filteredExpenseData =
//   //       startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
//   //         ? await getExpense(db)
//   //         : (await getExpense(db))?.filter((item: any) => {
//   //             const createdAt = FormatDate(item?.createdAt);
//   //             return createdAt >= startDate && createdAt <= endDate;
//   //           });
//   //     const filteredCashBuyData =
//   //       startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
//   //         ? await getCash_buy(db)
//   //         : (await getCash_buy(db))?.filter((item: any) => {
//   //             const createdAt = FormatDate(item?.createdAt);
//   //             return createdAt >= startDate && createdAt <= endDate;
//   //           });
//   //     const filteredDueData =
//   //       startDate === "DD/MM/YYYY" && endDate === "DD/MM/YYYY"
//   //         ? (await getCash_sell(db)).filter((item: any) => item?.dueAmount > 0)
//   //         : (await getCash_sell(db))
//   //             .filter((item: any) => item?.dueAmount > 0)
//   //             ?.filter((item: any) => {
//   //               const createdAt = FormatDate(item?.createdAt);
//   //               return createdAt >= startDate && createdAt <= endDate;
//   //             });
//   //     setGetAllCashSell(filteredCashData);
//   //     setDue(filteredDueData as DueCollectionData[]);
//   //     setCashBuy(filteredCashBuyData as CashBuyData[]);
//   //   };
//   //   asyncFunction();
//   // }, [selectedStartDate, selectedEndDate]);

 



//   const selectedDates =
//     selectedStartDate === "DD/MM/YYYY" && selectedEndDate === "DD/MM/YYYY";

//   return (
//     <Animated.View
//       entering={FadeInDown.delay(50).duration(300)}
//       style={styles.container}
//     >
//       <View style={styles.topSection}>
//         <Text style={styles.text1}>Cashbox Featured</Text>
//         <TouchableOpacity
//           style={styles.dateSelectorButton}
//           onPress={() => setSelected(!selected)}
//         >
//           <Text>
//             {selectedDates
//               ? "Select Date Range"
//               : `${selectedStartDate} -- ${selectedEndDate}`}
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.dateContainer}>
//         {/* {selected && ( */}
//         {/* <CalenderModal
//           selected={selected}
//           setSelected={setSelected}
//           onDateChangeData={onDateChangeData}
//         /> */}
//         {/* )} */}
//       </View>
//       <Divider height={1} width={"100%"} aligns={"center"} />
//       <View style={styles.bottomSection}>
//         {feature?.map((f, index) => {
//           return <Feature key={index.toString()} data={f} index={index} />;
//         })}
//       </View>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: radius.regular,
//     backgroundColor: Colors.white,
//   },
//   topSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     flex: 1,
//     overflow: "scroll",
//   },

//   bottomSection: {},
//   text1: {
//     fontSize: Fonts.medium,
//     fontWeight: "500",
//     color: Colors.darkCharcoal,
//   },
//   dateSelectorButton: {
//     height: 30,
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: Colors.border,
//     paddingHorizontal: 5,
//     borderRadius: radius.small,
//   },
//   dateContainer: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
// });

// export default CashboxFeature;




import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchCashSell } from "@/redux/features/cashboxDashboard/getCashSellSlice";
import { fetchDeposit } from "@/redux/features/cashboxDashboard/getDepositSlice";
import { fetchExpense } from "@/redux/features/cashboxDashboard/getExpenseSlice";
import { fetchWithdraw } from "@/redux/features/cashboxDashboard/getWithdrawSlice";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import Divider from "../Divider";
import Feature from "./Feature";
import { IFeature } from "@/types/interfaces/cashBox/feature.interface";

const CashboxFeature = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>("DD/MM/YYYY");
  const [selectedEndDate, setSelectedEndDate] = useState<string>("DD/MM/YYYY");
  const [selected, setSelected] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  // Dispatch actions on component mount
  useEffect(() => {
    dispatch(fetchCashSell());
    dispatch(fetchDeposit());
    dispatch(fetchExpense());
    dispatch(fetchWithdraw());
  }, [dispatch]);

  // Redux selectors
  const { cashSells } = useAppSelector((state) => state.getCashSell);
  const { deposit } = useAppSelector((state) => state.getDeposit);
  const { expense } = useAppSelector((state) => state.getExpense);
  const { withdraw: withdrawData } = useAppSelector((state) => state.getWithdraw);

  // Memoized Calculations
  const { cash_sells, deposits, expenseAmount, withdraw } = useMemo(() => {
    const cash = cashSells?.data?.reduce((sum, record) => sum + (record?.collected_amount || 0), 0) || 0;
    const deposits = deposit?.data?.reduce((sum, record) => sum + (record?.amount || 0), 0) || 0;
    const expenses = expense?.data?.reduce((sum, record) => sum + (record?.amount || 0), 0) || 0;
    const withdraw = withdrawData?.data?.reduce((sum, record) => sum + (record?.amount || 0), 0) || 0;

    const cash_sells = cash + deposits - expenses - withdraw;

    return { cash_sells, deposits, expenseAmount: expenses, withdraw };
  }, [cashSells, deposit, expense, withdrawData]);

  // Feature Data
  const feature: IFeature[] = [
    {
      icon: require("../../../assets/images/cashGreen.png"),
      text: "Cash Sell",
      amount: cash_sells,
      color: Colors.VeroneseGreen,
      textColor: Colors.green,
    },
    {
              icon: require("../../../assets/images/expense.png"),
              text: "Due",
              amount: 0,
              color: Colors.OrangeRed,
              textColor: Colors.red,
              link: "/pages/cashbox/dueReport",
            },
            {
              icon: require("../../../assets/images/expense.png"),
              text: "Cash buy",
              amount: 0,
              color: Colors.OrangeRed,
              textColor: Colors.red,
            },
    {
      icon: require("../../../assets/images/expense.png"),
      text: "Expenses",
      amount: expenseAmount,
      color: Colors.OrangeRed,
      textColor: Colors.red,
    },
    {
      icon: require("../../../assets/images/cashGreen.png"),
      text: "Deposited",
      amount: deposits,
      color: Colors.VeroneseGreen,
      textColor: Colors.green,
    },
    {
      icon: require("../../../assets/images/expense.png"),
      text: "Withdraw",
      amount: withdraw,
      color: Colors.OrangeRed,
      textColor: Colors.red,
    },
  ];

  // Selected date check
  const selectedDates =
    selectedStartDate === "DD/MM/YYYY" && selectedEndDate === "DD/MM/YYYY";

  return (
    <Animated.View
      entering={FadeInDown.delay(50).duration(300)}
      style={styles.container}
    >
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
      <Divider height={1} width={"100%"} aligns={"center"} />
      <View style={styles.bottomSection}>
        {feature?.map((f, index) => (
          <Feature key={index.toString()} data={f} index={index} />
        ))}
      </View>
    </Animated.View>
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
  },
  bottomSection: {
    padding: 10,
  },
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
});

export default CashboxFeature;
