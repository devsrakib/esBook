import { View, Text, StyleSheet, Image } from "react-native";
import React, { memo } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { currency } from "@/global/currency";

const NonRelationReportCart = ({ item, text }: { item: any; text: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textAndTimeCon}>
        <View style={styles.timeAndText}>
          <Text style={styles.title}>{text}</Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.time}>12:20 PM</Text>
        </View>
        <View>
          <Text style={styles.amount}>
            {currency}
            {item?.amount}
          </Text>
        </View>
      </View>
      <Text style={styles.dummyText}>{item?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: radius.regular,
    borderColor: Colors.border,
    paddingVertical: 12,
    width: "90%",
    alignSelf: "center",
    rowGap: 10,
  },
  textAndTimeCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: Fonts.medium,
    fontWeight: "600",
    color: Colors.red,
  },
  divider: {
    color: Colors.text,
  },
  timeAndText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  amount: {
    fontSize: Fonts.large,
    color: Colors.red,
    fontWeight: "600",
  },
});
export default memo(NonRelationReportCart);
