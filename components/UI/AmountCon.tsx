import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

const receiveAmount = 4000;

interface amountProps {
  bg_image: any;
  logo1: any;
  logo2?: any;
  leftTextColor: string;
  leftAmountTColor: string;
}
const AmountCon: React.FC<amountProps> = ({
  bg_image,
  logo1,
  logo2,
  leftAmountTColor,
  leftTextColor,
}) => {
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 15 }}
      style={styles.container}
      source={bg_image}
    >
      <View style={[styles.amountCon, { flex: 1.3 }]}>
        <Image style={styles.logo} source={logo1} />
        <View>
          <Text style={[styles.text, { color: leftTextColor }]}>
            You will Receive
          </Text>
          <Text style={[styles.amount, { color: leftAmountTColor }]}>
            $ {receiveAmount}
          </Text>
        </View>
      </View>
      <View style={styles.amountCon}>
        <Image style={styles.logo} source={logo2} />
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
    alignSelf: "center",
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
    width: 35,
    height: 35,
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
