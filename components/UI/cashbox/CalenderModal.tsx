import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { memo } from "react";
import Modal from "react-native-modal";

// import { CalendarPicker } from "react-native-calendar-picker";
// import CalendarPicker from "react-native-calendar-picker";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";

const CalenderModal = ({
  onDateChangeData,
  selected,
  setSelected,
}: {
  selected: boolean;
  setSelected: Function;
  onDateChangeData: Function;
}) => {
  return (
    <Modal
      isVisible={selected}
      onBackButtonPress={() => setSelected(false)}
      onBackdropPress={() => setSelected(false)}
      style={styles.dateModal}
      backdropOpacity={0.7}
    >
      <View style={styles.dateModalContent}>
        {/* <CalendarPicker
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
        /> */}
      </View>
    </Modal>
  );
};

export default memo(CalenderModal);
const styles = StyleSheet.create({
  dateModal: {
    height: 400,
  },
  dateModalContent: {
    height: 400,
    backgroundColor: Colors.white,
    borderRadius: radius.small,
  },
});
