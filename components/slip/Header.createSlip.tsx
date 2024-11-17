import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import GoBack from "../UI/header/GoBack";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
<<<<<<< HEAD
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({ setIsSelectCustomer }: { setIsSelectCustomer: any }) => {
  return (
    <LinearGradient
      colors={["#168F88", "#006B60", "#4D89A1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
=======
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const Header = ({ setIsSelectCustomer }: { setIsSelectCustomer: any }) => {
  return (
    <View style={styles.container}>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
      <View style={styles.titleCon}>
        <GoBack color={Colors.white} />
        <Text style={styles.title}>Create a New Slip</Text>
      </View>

      {/* amount */}
<<<<<<< HEAD
      {/* <View style={styles.amountCon}> */}
      <BlurView intensity={80} tint="light" style={styles.amountCon}>
        <Text style={styles.amount}>$9854348</Text>
      </BlurView>
      {/* </View> */}
    </LinearGradient>
=======
      <View style={styles.amountCon}>
        <Text style={styles.amount}>$9854348</Text>
      </View>
    </View>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: Colors.mainColor,
    paddingRight: 20,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  titleCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: Fonts.large,
    color: Colors.white,
  },
  amountCon: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  amount: {
    fontSize: Fonts.medium,
    color: Colors.mainColor,
    fontWeight: "500",
  },
});
