import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Fonts } from "@/constants/Fonts";
import Button from "./Button";
import { Colors } from "@/constants/Colors";

const CustomDatePicker = ({
  modalVisible,
  setModalVisible,
  date,
  setDate,
}: any) => {
  const handleDateChange = (field: any, value: any) => {
    setDate({ ...date, [field]: value });
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <Text style={{ fontSize: Fonts.large }}>
          Select your collection Date
        </Text>
        <View style={[styles.modalContainer, { flexDirection: "row" }]}>
          {/* <Text style={styles.label}>Day:</Text> */}
          <TextInput
            style={[
              styles.picker,
              { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 },
            ]}
            keyboardType="numeric"
            placeholder="DD"
            maxLength={2}
            onChangeText={(value) => handleDateChange("day", value)}
            // value={date.dd}
          />

          {/* <Text style={styles.label}>Month:</Text> */}
          <TextInput
            style={styles.picker}
            keyboardType="numeric"
            placeholder="MM"
            maxLength={2}
            onChangeText={(value) => handleDateChange("month", value)}
            // value={date.mm}
          />

          {/* <Text style={styles.label}>Year:</Text> */}
          <TextInput
            style={[
              styles.picker,
              { borderTopRightRadius: 20, borderBottomRightRadius: 20 },
            ]}
            keyboardType="numeric"
            placeholder="YYYY"
            maxLength={4}
            onChangeText={(value) => handleDateChange("year", value)}
            // value={date.yyyy}
          />
        </View>
        <Button
          bg={Colors.mainColor}
          title="Ok"
          width={"90%"}
          titleColor={Colors.white}
          radius={50}
          onPress={() => setModalVisible(false)}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    paddingVertical: 40,
  },
  picker: {
    width: 100,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default CustomDatePicker;
