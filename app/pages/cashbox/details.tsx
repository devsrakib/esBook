import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
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
  cash_report,
  cash_sell,
  deposit,
  due_collection,
  expense,
  updateDueAmount,
  withdraw,
} from "@/databases/Database";

const page = () => {
  const route = useLocalSearchParams<any>();
  const { bottom, top } = useSafeAreaInsets();
  const [transaction, setTransaction] = useState<any>();

  let transactionData: any;
  if (route.text == "Cash Sell") {
    transactionData = {
      customerId: route?.id,
      saleAmount: transaction?.sale,
      collectedAmount: transaction?.collect,
      dueAmount: transaction?.sale - transaction?.collect,
      extraAmount: transaction?.collect - transaction?.sale,
      description: transaction?.description,
    };
  } else if (route.text == "Cash buy") {
    transactionData = {
      supplierId: route?.id,
      amount: transaction?.sale,
      collectedAmount: transaction?.collect,
      dueAmount: transaction?.sale - transaction?.collect,
      extraAmount: transaction?.collect - transaction?.sale,
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
  }else if(route?.text == 'Due'){
    transactionData = {
      customerId: route?.id,
      collectedAmount: transaction?.sale,
      description: transaction?.description,
    };
  }

  console.log(transactionData, 'transaction data');
  

  const db = useSQLiteContext();

  const handleCashSell = async () => {
    await cash_sell(db, transactionData);
    console.log(transactionData);
  };

  const handleExpense = async () => {
    await expense(db, transactionData);
    console.log(transactionData);
  };
  const handleDeposit = async () => {
    await deposit(db, transactionData);
    console.log(transactionData);
  };
  const handleCashBuy = async () => {
    await cash_buy(db, transactionData);
    console.log(transactionData);
    
  };
  const handleWithdraw = async () => {
    await withdraw(db, transactionData);
    console.log(transactionData);
  };
  // const handleCashReport = async () => {
  //   await cash_report(db, transactionData);
  //   console.log(transactionData);
  // };
  const handleDue = async () => {
    await updateDueAmount(db, transactionData);
    console.log(transactionData);
  };

  console.log(route);
  

  const handleInput = () => {
    
    if (route?.text === "Cash Sell") {
      handleCashSell();
    } else if (route?.text === "Expenses") {
      handleExpense();
    } else if (route?.text === "Deposited") {
      handleDeposit();
    } else if (route?.text === "Cash buy") {
      handleCashBuy();
      console.log(transactionData);
    } else if (route?.text === "Due") {
      handleDue();
      console.log('hello due');
      console.log(transactionData);
      
    } else {
      handleWithdraw();
    }
  };


  const customerTextMapping = {
  "Cash Sell": "Customer",
  "Due": "Customer",
  "Cash buy": "Supplier",
};

const shouldRenderComponent = ["Cash Sell", "Due", "Cash buy"].includes(route?.text);



  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.headerSection}>
        <Header height={70} title={route.text} titleColor={Colors.white} />
        {shouldRenderComponent && (
          
    <SearchCustomerAndAddCustomer text={customerTextMapping[route?.text]} />
  
        )}
      </View>
      <View style={styles.bodySection}>
        <View style={styles.dummyTextCon}>
          <Feather name="info" size={18} color={Colors.text} />
          <Text numberOfLines={1} style={styles.dummyText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing ...adipiscing
            elit...
          </Text>
        </View>
      </View>
      <DetailsPageInput setTransaction={setTransaction} text={route.text} />
      <Button
        title="save"
        radius={radius.large}
        titleColor={Colors.white}
        bg={Colors.mainColor}
        onPress={() => handleInput()}
        width={"90%"}
      />
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
});

export default page;
