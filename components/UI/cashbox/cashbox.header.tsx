import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { headerHeightWidth, radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Link } from "expo-router";
import { Entypo } from "@expo/vector-icons";

const Header = ({ currentCash }: { currentCash: number }) => {
  return (
    <View style={styles.header}>
      <Link
        href={{
          pathname: "/pages/cashbox/matchCashbox",
          params: {
            amount: currentCash,
          },
        }}
        asChild
      >
        <TouchableOpacity style={styles.matchCashbox}>
          <Entypo name="calculator" size={16} color={Colors.mainColor} />
          <Text style={styles.matchText}>Match Cashbox</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // height: ,
    // backgroundColor: Colors.mainColor,
    // width: "100%",
    // justifyContent: "space-between",
    paddingHorizontal: 20,
    // flexDirection: "row",
    alignItems: "flex-end",
    // justifyContent: "flex-end",
  },
  headerText: {
    fontWeight: "500",
    fontSize: Fonts.large,
    color: Colors.white,
  },
  matchCashbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  matchLogo: {
    width: 18,
    height: 18,
  },
  matchText: {
    fontSize: Fonts.regular,
    color: Colors.mainColor,
  },
});
