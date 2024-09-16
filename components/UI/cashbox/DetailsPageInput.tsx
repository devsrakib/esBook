import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { Fragment } from "react";
import { currency } from "@/global/currency";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Entypo } from "@expo/vector-icons";
const DetailsPageInput = ({
  setTransaction,
  text,
  amount,
}: {
  setTransaction: Function;
  text: any;
  amount: number;
}) => {
  const handleChange = (key: any, value: any) => {
    setTransaction((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text} amount</Text>
      <View style={styles.inputCon}>
        <TextInput
          style={styles.input}
          placeholder={`${
            text === "customer" || (text === "supplier" && amount)
              ? amount
              : "0.00"
          }`}
          keyboardType="numeric"
          onChangeText={(e) => handleChange("sale", e)}
        />
        <View style={styles.currencyCon}>
          <Text adjustsFontSizeToFit>{currency}</Text>
        </View>
      </View>
      {(text === "Cash Sell" || text === "Cash buy") && (
        <Fragment>
          <Text style={styles.label}>Collected amount</Text>
          <View style={styles.inputCon}>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="numeric"
              onChangeText={(e) => handleChange("collect", e)}
            />
            <View style={styles.currencyCon}>
              <Entypo name="calendar" size={16} color={Colors.text} />
            </View>
          </View>
        </Fragment>
      )}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Type here"
        onChangeText={(e) => handleChange("description", e)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  inputCon: {
    height: 44,
    width: "100%",
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: Fonts.medium,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  currencyCon: {
    width: 50,
    height: "100%",
    borderTopRightRadius: radius.medium,
    borderBottomRightRadius: radius.medium,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background2,
  },
  textArea: {
    height: 120,
    width: "100%",
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 10,
    marginBottom: 20,
    textAlignVertical: "top",
    padding: 10,
    fontSize: Fonts.medium,
  },
});

export default DetailsPageInput;
