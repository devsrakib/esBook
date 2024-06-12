import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { Fragment } from "react";
import Divider from "../Divider";
import { FontAwesome6 } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Link } from "expo-router";

const Customers = () => {
  return (
    <Link
      href={{
        pathname: "/pages/parties/CustomerView",
      }}
      asChild
    >
      <TouchableOpacity style={styles.customerDetails}>
        <View style={styles.avatar}>
          <FontAwesome6 name="user-secret" size={24} color="black" />
        </View>
        <View style={styles.nameSection}>
          <Text style={styles.name}>Mehedi hasan</Text>
          <Text style={styles.date}>3 Jun,2024</Text>
        </View>
        <Text>$23,000</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  customerDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    height: 50,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: radius.medium,
  },
  avatar: {
    borderWidth: 1,
    borderRadius: radius.large,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.border,
    width: 36,
    height: 36,
  },
  nameSection: {
    flex: 1,
  },
  name: {
    fontSize: Fonts.medium,
    fontWeight: "600",
    color: Colors.darkCharcoal,
  },
  date: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
});
export default Customers;
