import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

import useApiHook from "@/hooks/all_api_hooks";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "@/hooks/hooks";

const Header = () => {
  const {products, loading, error}  = useAppSelector(state => state.products)
  return (
    <LinearGradient
     colors={[Colors.lightGray, Colors.linearSecond, Colors.linearThird]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.titleCon}>
        <Text style={styles.text}>Products</Text>
        {products?.data?.length && (
          <View style={styles.quantityCon}>
            <Text>{products?.data?.length ? products?.data?.length : "..."}</Text>
          </View>
        )}
      </View>
      <View style={styles.addProductCon}>
        <Link href={"/pages/product/AddProduct"} asChild>
          <Pressable style={styles.addProduct}>
            <Entypo name="plus" size={24} color={Colors.mainColor} />
          </Pressable>
        </Link>
        <Link href={"/pages/camera/barcodeScannerScreen"} asChild>
          <Pressable style={styles.addProduct}>
            <Entypo name="camera" size={24} color={Colors.mainColor} />
          </Pressable>
        </Link>
      </View>
    </LinearGradient>
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
  addProductCon: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
});
