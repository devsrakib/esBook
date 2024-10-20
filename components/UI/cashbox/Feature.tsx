import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { Fragment, memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { currency } from "@/global/currency";
import Divider from "../Divider";
import { Link } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

const Feature = ({ data, index }: { data: any; index: number }) => {
  const text = data?.text;
  const CustomTouchable = Animated.createAnimatedComponent(Link);
  return (
    <>
      <CustomTouchable
        entering={FadeInDown.delay(index * 100)
          .duration(400)
          .damping(80)
          .springify()}
        href={{
          pathname: `${data?.link ? data?.link : "/pages/cashbox/details"}` as
            | string
            | any,
          params: { text: text, index: index },
        }}
        asChild
      >
        <TouchableOpacity style={styles.container}>
          <View style={[styles.imgCon, { backgroundColor: data?.color }]}>
            <Image style={styles.img} source={data?.icon} />
          </View>
          <Text style={styles.text1}>{data?.text}</Text>
          <View style={styles.amountCon}>
            <Text style={[styles.amount, { color: data?.textColor }]}>
              {currency}
              {data?.amount?.toLocaleString("en-US") || "0"}
            </Text>
            <AntDesign name="right" size={16} color={Colors.text} />
          </View>
        </TouchableOpacity>
      </CustomTouchable>
      <Divider height={1} width={"90%"} aligns="center" />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    gap: 12,
  },
  imgCon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  text1: {
    flex: 1,
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  amountCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  amount: {
    fontSize: Fonts.medium,
    fontWeight: "700",
  },
});

export default memo(Feature);
