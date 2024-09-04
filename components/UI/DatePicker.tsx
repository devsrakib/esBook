import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";

interface DatePickerProps {
  background: string;
  iconSite: "left" | "right";
  iconColor: string;
  iconSize: number;
  date: Date;
  setDate: Function;
}

const DatePicker: React.FC<DatePickerProps> = ({
  background,
  iconSite,
  iconColor,
  iconSize,
  date,
  setDate,
}) => {
  // Initialize with the current date
  const [show, setShow] = useState<boolean>(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const formatDate = (date: Date) => {
    // Format date to a readable string (e.g., 'Aug 1, 2024')
    return date?.toLocaleDateString();
  };

  return (
    <TouchableOpacity
      onPress={showDatePicker}
      style={[
        styles.calenderCon,
        {
          flexDirection: iconSite === "left" ? "row-reverse" : "row",
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
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.date}>{formatDate(date)}</Text>
      {/* Ensure date is a string */}
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
