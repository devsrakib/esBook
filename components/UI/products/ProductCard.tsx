import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { memo } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";

const ProductCard = ({ item }: any) => {
  const CustomPressable = Animated.createAnimatedComponent(Pressable);

  console.log(item);

  return (
    <Link href={"/pages/product/ProductView"} asChild>
      <CustomPressable
        entering={FadeInDown.delay(50).damping(80).springify().stiffness(200)}
        style={styles.container}
      >
        <View style={styles.imgCon}>
          <Image
            style={styles.productPhoto}
            source={require("../../../assets/images/bookBlue.png")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item?.product_name}</Text>
          <Text style={styles.desc}>Buying Price: {item?.buying_price}</Text>
          <View style={styles.quantityCon}>
            <Text style={styles.quantity}>{item?.quantity}</Text>
          </View>
        </View>
      </CustomPressable>
    </Link>
  );
};

export default memo(ProductCard);

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: "46%",
    // borderWidth: 1,
    // borderColor: Colors.mainColor,
    borderRadius: radius.small,
    shadowColor: Colors.mainColor,
    elevation: 5,
    // flexDirection: "row",
    // alignItems: "center",
    gap: 8,
    backgroundColor: Colors.white,
    margin: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  imgCon: {
    width: "40%",
    height: 60,
    backgroundColor: Colors.VeroneseGreen,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.small,
  },
  productPhoto: {
    width: 50,
    height: 90,
    borderRadius: radius.small,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: Fonts.regular,
    color: Colors.mainColor,
  },
  quantityCon: {
    width: 40,
    height: 30,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.text,
    elevation: 5,
    backgroundColor: Colors.white,
  },
  quantity: {
    color: Colors.mainColor,
    fontSize: Fonts.small,
    fontWeight: "500",
  },
  desc: {
    color: Colors.text,
    fontSize: Fonts.small,
  },
});
