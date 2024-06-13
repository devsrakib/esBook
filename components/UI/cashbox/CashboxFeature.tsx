import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import Divider from "../Divider";
import { Fonts } from "@/constants/Fonts";
import Feature from "./Feature";
import { IFeature } from "@/types/interfaces/feature.interface";
import DatePicker from "../DatePicker";

const feature: IFeature[] = [
  {
    icon: require("../../../assets/images/cashGreen.png"),
    text: "Cash Sell",
    amount: 30000,
    color: Colors.VeroneseGreen,
    textColor: Colors.green,
  },
  {
    icon: require("../../../assets/images/expense.png"),
    text: "Due",
    amount: 30000,
    color: Colors.OrangeRed,
    textColor: Colors.red,
  },
  {
    icon: require("../../../assets/images/expense.png"),
    text: "Cash buy",
    amount: 30000,
    color: Colors.OrangeRed,
    textColor: Colors.red,
  },
  {
    icon: require("../../../assets/images/expense.png"),
    text: "Expenses",
    amount: 30000,
    color: Colors.OrangeRed,
    textColor: Colors.red,
  },
  {
    icon: require("../../../assets/images/cashGreen.png"),
    text: "Deposited",
    amount: 30000,
    color: Colors.VeroneseGreen,
    textColor: Colors.green,
  },
  {
    icon: require("../../../assets/images/expense.png"),
    text: "Withdraw",
    amount: 30000,
    color: Colors.OrangeRed,
    textColor: Colors.red,
  },
];

const CashboxFeature = () => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.text1}>Cashbox Featured</Text>
        <DatePicker
          background={Colors.white}
          iconSite="right"
          iconColor={Colors.mainColor}
          iconSize={18}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  bottomSection: {},
  text1: {
    fontSize: Fonts.medium,
    fontWeight: "500",
    color: Colors.darkCharcoal,
  },
});

export default CashboxFeature;
