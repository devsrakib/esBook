import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

const receiveAmount = 4000;

const AmountCon = () => {
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 15 }}
      style={styles.container}
      source={require("../../assets/images/amountFrame.png")}
    >
      <View style={[styles.amountCon, { flex: 1.3 }]}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/receive.png")}
        />
        <View>
          <Text style={styles.text}>You will Receive</Text>
          <Text style={styles.amount}>$ {receiveAmount}</Text>
        </View>
      </View>
      <View style={styles.amountCon}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/give.png")}
        />
        <View>
          <Text style={styles.text}>You will Give</Text>
          <Text style={styles.amount}>$ {receiveAmount}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 110,
    flexDirection: "row",
    // padding: 4,
    gap: 10,
    resizeMode: "stretch",
  },
  amountCon: {
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: Fonts.small,
    color: Colors.white,
  },
  amount: {
    fontSize: Fonts.extraLarge,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.white,
  },
});

export default AmountCon;
