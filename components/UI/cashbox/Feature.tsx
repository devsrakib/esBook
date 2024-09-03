import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { Fragment } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { currency } from "@/global/currency";
import Divider from "../Divider";
import { Link } from "expo-router";

const Feature = ({ data }: { data: any }) => {
  const text = data?.text;

  return (
    <Fragment>
      <Link
        href={{
          pathname: `${data?.link ? data?.link : "/pages/cashbox/details"}`,
          params: { text: text },
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
      </Link>
      <Divider height={1} width={"90%"} aligns="center" />
    </Fragment>
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

export default Feature;
