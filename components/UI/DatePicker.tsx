import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { format } from "date-fns";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";

interface datePickerProps {
  background: string;
  iconSite: string;
  iconColor: string;
  iconSize: number;
}
const DatePicker: React.FC<datePickerProps> = ({
  background,
  iconSite,
  iconColor,
  iconSize,
}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        showDatePicker();
      }}
      style={[
        styles.calenderCon,
        {
          flexDirection: iconSite == "left" ? "row-reverse" : "row",
          backgroundColor: background,
        },
      ]}
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
      <AntDesign name="calendar" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
export default DatePicker;
