import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
} from "react-native";
import React, { act, useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/cashbox/Header";
import { Colors } from "@/constants/Colors";
import SearchCustomerAndAddCustomer from "@/components/UI/cashbox/SearchCustomerAndAddCustomer";
import { Feather } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import Button from "@/components/UI/Button";
import DetailsPageInput from "@/components/UI/cashbox/DetailsPageInput";
import { useSQLiteContext } from "expo-sqlite";
import {
  cash_buy,
  cash_sell,
  deposit,
  expense,
  updateDueAmount,
  updateSupplierDueAmount,
  withdraw,
} from "@/databases/Database";
import { ensureNonNegative } from "@/utils/ensureNonNegative";
import Animated, { FadeInDown } from "react-native-reanimated";
import SlipModal from "./SlipModal";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { postCashSell } from "@/redux/features/cashboxDashboard/cashSellSlice";
import { postDeposit } from "@/redux/features/cashboxDashboard/dipositeSlice";
import { postExpense } from "@/redux/features/cashboxDashboard/expenseSlice";
import { fetchCashSell } from "@/redux/features/cashboxDashboard/getCashSellSlice";
import { fetchDeposit } from "@/redux/features/cashboxDashboard/getDepositSlice";
import { fetchExpense } from "@/redux/features/cashboxDashboard/getExpenseSlice";
import { fetchWithdraw } from "@/redux/features/cashboxDashboard/getWithdrawSlice";

const page = () => {
  const route = useLocalSearchParams<any>();
  const { bottom, top } = useSafeAreaInsets();
  const [transaction, setTransaction] = useState<any>();
  const [activeModal, setActiveModal] = useState(false)
 
  const navigation = useRouter();

const dispatch = useAppDispatch();

  // Fetch data






  let transactionData: any;
  if (route.text == "Cash Sell") {
    transactionData = {
      customer: route?.id,
      sell_amount: transaction?.sale,
      collected_amount: transaction?.collect,
      // dueAmount: ensureNonNegative(transaction?.sale - transaction?.collect),
      // extraAmount: ensureNonNegative(transaction?.collect - transaction?.sale),
      description: transaction?.description,
    };
  } else if (route.text == "Cash buy") {
    transactionData = {
      supplierId: route?.id,
      amount: transaction?.sale,
      collectedAmount: transaction?.collect,
      dueAmount: ensureNonNegative(transaction?.sale - transaction?.collect),
      extraAmount: ensureNonNegative(transaction?.collect - transaction?.sale),
      description: transaction?.description,
    };
  } else if (route.text == "Expenses") {
    transactionData = {
      amount: transaction?.sale,
      description: transaction?.description,
    };
  } else if (route.text == "Deposited") {
    transactionData = {
      amount: transaction?.sale,
      description: transaction?.description,
    };
  } else if (route.text == "Withdraw") {
    transactionData = {
      amount: transaction?.sale,
      description: transaction?.description,
    };
  } else if (route?.text == "customer") {
    transactionData = {
      customerId: route?.customerId,
      id: route?.id,
      dueAmount: transaction?.sale,
      description: transaction?.description,
    };
  } else if (route?.text == "supplier") {
    transactionData = {
      supplierId: route?.supplierId,
      id: route?.id,
      dueAmount: transaction?.sale,
      description: transaction?.description,
    };
  }

  const db = useSQLiteContext();
  

  const handleCashSell = async () => {
    dispatch(postCashSell(transactionData))
  };

  const handleDeposit = async () =>{
    dispatch(postDeposit(transactionData))
  }

  const handleExpense = async () => {
    dispatch(postExpense(transactionData))
  };
  // const handleDeposit = async () => {
  //   const result = await deposit(db, transactionData);
  //   if (result.success) {
  //     navigation.push("/(tabs)/cashbox");
  //   }
  // };
  const handleCashBuy = async () => {
    const result = await cash_buy(db, transactionData);
    if (result.success) {
      navigation.push("/(tabs)/cashbox");
    }
  };
  const handleWithdraw = async () => {
    const result = await withdraw(db, transactionData);
    if (result.success) {
      navigation.push("/(tabs)/cashbox");
    } else {
      if (!result.success) {
        ToastAndroid.showWithGravity(
          result.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }
  };
  // const handleCashReport = async () => {
  //   await cash_report(db, transactionData);
  //   console.log(transactionData);
  // };
  const handleDue = async () => {
    const result = await updateDueAmount(db, transactionData);
    if (result.success) {
      navigation.push("/(tabs)/cashbox");
      setTransaction("");
    }
  };
  const handleCashBuyDue = async () => {
    const result = await updateSupplierDueAmount(db, transactionData);
    if (result.success) {
      navigation.push("/(tabs)/cashbox");
      setTransaction("");
    }
  };

  const handleInput = () => {
    if (route?.text === "Cash Sell") {
      handleCashSell();
    } else if (route?.text === "Expenses") {
      handleExpense();
    } else if (route?.text === "Deposited") {
      handleDeposit();
    } else if (route?.text === "Cash buy") {
      handleCashBuy();
    } else if (route?.text === "customer") {
      handleDue();
    } else if (route?.text === "supplier") {
      handleCashBuyDue();
    } else {
      handleWithdraw();
    }
  };

  const customerTextMapping: any = {
    "Cash Sell": "Customer",
    Due: "Customer",
    "Cash buy": "Supplier",
  };

  const shouldRenderComponent = ["Cash Sell", "Due", "Cash buy"].includes(
    route?.text
  );

  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <ScrollView style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View style={styles.headerSection}>
          <Header
            height={70}
            title={
              route?.text === "customer" || route?.text === "customer"
                ? `${route?.text === "customer" ? "Customer" : "Supplier"} Due`
                : route?.text
            }
            titleColor={Colors.white}
            index={route?.index}
          />
          {shouldRenderComponent && (
            <SearchCustomerAndAddCustomer
            setActiveModal={setActiveModal}
              text={customerTextMapping[route?.text]}
              id={route?.id}
            />
          )}
        </View>
        <View style={styles.bodySection}>
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(400)
              .damping(80)
              .springify()}
            style={styles.dummyTextCon}
          >
            <Feather name="info" size={18} color={Colors.text} />
            <Animated.Text numberOfLines={1} style={styles.dummyText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing ...adipiscing
              elit...
            </Animated.Text>
          </Animated.View>
        </View>
        <DetailsPageInput
          setTransaction={setTransaction}
          text={route?.text}
          amount={route?.dueAmount}
        />
      </ScrollView>
      <Button
        title="save"
        radius={radius.small}
        titleColor={Colors.white}
        bg={Colors.mainColor}
        onPress={() => handleInput()}
        width={"90%"}
      />
      <SlipModal activeModal={activeModal} setActiveModal={setActiveModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerSection: {
    backgroundColor: Colors.mainColor,
  },
  bodySection: {},
  dummyTextCon: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
    paddingVertical: 20,
  },
  dummyText: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  userDataContainer: {
    height: 50,
    borderRadius: radius.regular,
    width: "90%",
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 4,
  },
  imageContainer: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: radius.small,
  },
});

export default page;
