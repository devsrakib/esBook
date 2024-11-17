import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { Fragment, memo } from "react";
import { currency } from "@/global/currency";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Entypo } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
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
  const CustomTextInput = Animated.createAnimatedComponent(TextInput);
  return (
    <View style={styles.container}>
      <Animated.Text
        entering={FadeInDown.delay(200).duration(400).damping(80).springify()}
        style={styles.label}
      >
        {text} amount
      </Animated.Text>
      <Animated.View
        entering={FadeInDown.delay(250).duration(400).damping(80).springify()}
        style={styles.inputCon}
      >
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
      </Animated.View>
      {(text === "Cash Sell" || text === "Cash buy") && (
        <Fragment>
          <Animated.Text
            entering={FadeInDown.delay(300)
              .duration(400)
              .damping(80)
              .springify()}
            style={styles.label}
          >
            Collected amount
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(350)
              .duration(400)
              .damping(80)
              .springify()}
            style={styles.inputCon}
          >
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="numeric"
              onChangeText={(e) => handleChange("collect", e)}
            />
            <View style={styles.currencyCon}>
              <Entypo name="calendar" size={16} color={Colors.text} />
            </View>
          </Animated.View>
        </Fragment>
      )}
      <Animated.Text
        entering={FadeInDown.delay(400).duration(400).damping(80).springify()}
        style={styles.label}
      >
        Description
      </Animated.Text>
      <CustomTextInput
        entering={FadeInDown.delay(200).duration(400).damping(80).springify()}
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
<<<<<<< HEAD
    borderRadius: radius.small,
=======
    borderRadius: radius.medium,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
    borderTopRightRadius: radius.small,
    borderBottomRightRadius: radius.small,
=======
    borderTopRightRadius: radius.medium,
    borderBottomRightRadius: radius.medium,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background2,
  },
  textArea: {
    height: 120,
    width: "100%",
<<<<<<< HEAD
    borderRadius: radius.small,
=======
    borderRadius: radius.medium,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 10,
    marginBottom: 20,
    textAlignVertical: "top",
    padding: 10,
    fontSize: Fonts.medium,
  },
});

export default memo(DetailsPageInput);
