import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";
import Divider from "../Divider";
import { Fonts } from "@/constants/Fonts";
import Feature from "./Feature";
import { IFeature } from "@/types/feature.interface";

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
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setShow(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.text1}>Cashbox Featured</Text>
        <TouchableOpacity
          onPress={() => {
            showDatePicker();
          }}
          style={styles.calenderCon}
        >
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShow(false);
                setDate(currentDate);
              }}
            />
          )}
          <Text style={styles.date}>{format(date, "dd MMM, yyyy")}</Text>
          <AntDesign name="calendar" size={20} color={Colors.mainColor} />
        </TouchableOpacity>
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
  calenderCon: {
    flexDirection: "row",
    gap: 10,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    fontSize: Fonts.small,
    color: Colors.text,
  },
  bottomSection: {},
  text1: {
    fontSize: Fonts.medium,
    fontWeight: "500",
    color: Colors.darkCharcoal,
  },
});

export default CashboxFeature;
