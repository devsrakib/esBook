import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useDynamicColors } from "@/constants/Colors";
import GoBack from "../UI/header/GoBack";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({ setIsSelectCustomer }: { setIsSelectCustomer: any }) => {
  const Colors = useDynamicColors()
  const styles  = getStyle(Colors)
  return (
    <LinearGradient
      colors={["#168F88", "#006B60", "#4D89A1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.titleCon}>
        <GoBack color={Colors.white} />
        <Text style={styles.title}>Create a New Slip</Text>
      </View>

      {/* amount */}
      {/* <View style={styles.amountCon}> */}
      <BlurView intensity={80} tint="light" style={styles.amountCon}>
        <Text style={styles.amount}>$348</Text>
        <View style={styles.quantityCon}>
          <Text style={styles.quantity}>8</Text>
        </View>
      </BlurView>
      {/* </View> */}
    </LinearGradient>
  );
};

export default Header;

const getStyle =(Colors: any)=>({
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
    paddingRight: 4,
    paddingVertical: 2,
    paddingLeft: 8,
    gap: 10,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    flexDirection: "row",
  },
  amount: {
    fontSize: Fonts.medium,
    color: Colors.mainColor,
    fontWeight: "500",
  },
  quantityCon:{
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.small,
    backgroundColor: Colors.mainColor,
    alignItems: "center",
    justifyContent: "center"
  },
  quantity:{
    fontSize: Fonts.medium,
    color: Colors.white,
    fontWeight: "500",
  }
});
