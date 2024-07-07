import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Divider from "../Divider";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { currency } from "@/global/currency";
const MoneySection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imgCon}>
          <Image
            style={styles.img}
            source={require("../../../assets/images/receiveBlue.png")}
          />
        </View>
        <View style={styles.textCon}>
          <Text style={styles.text1}>Collect Money 3x Faster</Text>
          <Text style={styles.textMoney}>
            {currency}234,500
            <Text style={styles.text2}> is with 20 Customer Set Date Now</Text>
          </Text>
        </View>
      </View>
      <Divider height={1} width={"100%"} aligns={"center"} />
      <TouchableOpacity style={styles.calender}>
        <Feather name="calendar" size={24} color={Colors.mainColor} />
        <Text style={styles.setText}>Set Collection Data</Text>
        <AntDesign name="right" size={18} color={Colors.mainColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: radius.regular,
    backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
  },
  imgCon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  textCon: {
    flex: 1,
    gap: 8,
  },
  text1: {
    fontSize: Fonts.medium,
    fontWeight: "500",
    color: Colors.mainColor,
  },
  textMoney: {
    fontSize: Fonts.medium,
    fontWeight: "700",
    lineHeight: 22,
  },
  text2: {
    fontSize: Fonts.regular,
    color: Colors.text,
    fontWeight: "400",
  },
  setText: {
    fontSize: Fonts.regular,
    color: Colors.mainColor,
    flex: 1,
  },
  calender: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.lavender,
    borderRadius: radius.medium,
    marginTop: 15,
    flexDirection: "row",
    gap: 10,
  },
});

export default MoneySection;
