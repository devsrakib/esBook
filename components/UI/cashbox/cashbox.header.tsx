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
        <TouchableOpacity activeOpacity={0.7} style={styles.matchCashbox}>
          <Entypo name="calculator" size={20} color={Colors.mainColor} />
          <Text style={styles.matchText}>Match Cashbox</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: Colors.mainColor,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 6,
  },
  matchCashbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 3,
    paddingVertical: 3,
    width: "100%",
    height: 40,
  },
  matchText: {
    fontSize: Fonts.large,
    color: Colors.mainColor,
  },
});
