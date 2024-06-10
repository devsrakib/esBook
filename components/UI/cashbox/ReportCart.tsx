import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

const ReportCart = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textAndTimeCon}>
        <Text style={styles.title}>Cash Buy</Text>
        <Text style={styles.divider}>|</Text>
        <Text style={styles.time}>12:20 PM</Text>
      </View>
      <Text style={styles.dummyText}>
        Lorem ipsum dolor sit amet, ectetur adipiscing elit.Lorem ipsum dolor
        sit amet.
      </Text>
      <View>
        <View style={styles.bottomSection}>
          <Image style={styles.img} />
          <Text style={styles.name}>Nazrul Islam</Text>
          <Text>
            Buy Amount: <Text>1,200</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: radius.regular,
    borderColor: Colors.border,
    paddingTop: 12,
    width: "90%",
    alignSelf: "center",
    rowGap: 10,
  },
  textAndTimeCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: Fonts.medium,
    fontWeight: "600",
    color: Colors.red,
  },
  divider: {
    color: Colors.text,
  },
  time: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  dummyText: {
    fontSize: Fonts.regular,
    color: Colors.text,
    marginHorizontal: 10,
    lineHeight: 22,
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: Colors.background2,
    borderBottomLeftRadius: radius.regular,
    borderBottomRightRadius: radius.regular,
    paddingHorizontal: 20,
    height: 40,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  name: {
    flex: 1,
    fontSize: Fonts.regular,
    fontWeight: "600",
  },
});
export default ReportCart;
