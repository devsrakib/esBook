import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { currency } from "@/global/currency";
import { Link } from "expo-router";

const MatchTopSection = ({ amount }: { amount: number }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bookImgCon}>
        <Image
          style={styles.bookImg}
          source={require("../../../assets/images/bookBlue.png")}
        />
      </View>
      <View style={styles.dataCon}>
        <Text style={styles.text}>Current Cash</Text>
        <Text style={styles.amount}>
          {currency}
          {amount}
        </Text>
      </View>
      <Link href={{ pathname: "pages/cashbox/cashReport" }} asChild>
        <TouchableOpacity style={styles.reportButtonCon}>
          <MaterialCommunityIcons
            name="calendar-text-outline"
            size={18}
            color={Colors.red}
          />
          <Text style={styles.reportText}>Report</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: " 90%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: radius.medium,
    gap: 20,
  },
  bookImgCon: {
    width: 40,
    height: 40,
    borderRadius: radius.regular,
    backgroundColor: Colors.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  bookImg: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  dataCon: {
    flex: 1,
    gap: 5,
  },
  text: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  amount: {
    fontSize: Fonts.medium,
    fontWeight: "700",
    color: Colors.mainColor,
  },
  reportButtonCon: {
    backgroundColor: Colors.OrangeRed,
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.small,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reportText: {
    color: Colors.red,
    fontSize: Fonts.medium,
  },
});
export default MatchTopSection;
