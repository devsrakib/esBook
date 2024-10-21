import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleCon}>
        <Text style={styles.text}>Products</Text>
        <View style={styles.quantityCon}>
          <Text style={styles.quantity}>11</Text>
        </View>
      </View>
      <Link href={"/pages/product/AddProduct"} asChild>
        <Pressable style={styles.addProduct}>
          <Entypo name="plus" size={24} color={Colors.mainColor} />
        </Pressable>
      </Link>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: "center",
    backgroundColor: Colors.mainColor,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    fontSize: Fonts.large,
    fontWeight: "600",
    color: Colors.white,
  },
  addProduct: {
    width: 30,
    height: 30,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  quantityCon: {
    width: 22,
    height: 22,
    borderRadius: radius.large,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  quantity: {
    fontWeight: "500",
    fontSize: Fonts.small,
    color: Colors.mainColor,
  },
  titleCon: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
