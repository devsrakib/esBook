import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { getCash_buy, getCash_sell } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import { currency } from "@/global/currency";
import Animated, { FadeInDown } from "react-native-reanimated";
<<<<<<< HEAD
import { radius } from "@/constants/sizes";
import { LinearGradient } from "expo-linear-gradient";

interface amountProps {
  leftBgColor: any;
=======

interface amountProps {
  bg_image: any;
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  icon1: any;
  icon2?: any;
  leftTextColor: string;
  leftAmountTColor: string;
}
const AmountCon: React.FC<amountProps> = ({
<<<<<<< HEAD
  leftBgColor,
=======
  bg_image,
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  icon1,
  icon2,
  leftAmountTColor,
  leftTextColor,
}) => {
  const [receive, setReceive] = useState<number>(0);
  const [cashBuyDue, setCashBuyDue] = useState<number>(0);
<<<<<<< HEAD
=======
  const BgImage = Animated.createAnimatedComponent(ImageBackground);
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  const { width } = Dimensions.get("window");
  const isTablet = width >= 600;

  const db = useSQLiteContext();
  useEffect(() => {
    async function getReceive() {
      const result = await getCash_sell(db);
      const cash_buy = await getCash_buy(db);
      const totalCollectedAmount = result?.reduce(
        (sum: number, record: any) => sum + record?.dueAmount,
        0
      );
      const totalCash_buy = cash_buy?.reduce(
        (sum: number, record: any) => sum + record?.dueAmount,
        0
      );
      setReceive(totalCollectedAmount);
      setCashBuyDue(totalCash_buy);
    }
    getReceive();
  }, []);

  return (
<<<<<<< HEAD
    <Animated.View
      entering={FadeInDown.delay(50).duration(300).damping(80).springify()}
      style={[styles.container, { height: isTablet ? 200 : 100 }]}
    >
      <View style={[styles.amountCon, { backgroundColor: leftBgColor }]}>
        {icon1}
        <View style={{ flex: 1 }}>
=======
    <BgImage
      entering={FadeInDown.delay(50).duration(300).damping(80).springify()}
      imageStyle={{ borderRadius: 15 }}
      style={[styles.container, { height: isTablet ? 200 : 100 }]}
      source={bg_image}
    >
      <View style={[styles.amountCon, { flex: 1.3 }]}>
        {icon1}
        <View>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
          <Text
            style={[
              styles.text,
              {
                color: leftTextColor,
                fontSize: isTablet ? Fonts.tab_regular : Fonts.small,
              },
            ]}
          >
            You will Receive
          </Text>
          <Text
            style={[
              styles.amount,
              {
                color: leftAmountTColor,
                fontSize: isTablet ? Fonts.tab_large : Fonts.extraLarge,
              },
            ]}
          >
            {currency} {receive?.toLocaleString("en-US") || "0"}
          </Text>
        </View>
      </View>
      <View style={[styles.amountCon]}>
        {icon2}
<<<<<<< HEAD
        <View style={{ flex: 1 }}>
=======
        <View>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
          <Text
            style={[
              styles.text,
              { fontSize: isTablet ? Fonts.tab_regular : Fonts.small },
            ]}
          >
            You will Give
          </Text>
          <Text
            style={[
              styles.amount,
              { fontSize: isTablet ? Fonts.tab_large : Fonts.extraLarge },
            ]}
          >
            {currency} {cashBuyDue?.toLocaleString("en-US") || "0"}
          </Text>
        </View>
      </View>
<<<<<<< HEAD
    </Animated.View>
=======
    </BgImage>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 110,
    flexDirection: "row",
    alignSelf: "center",
<<<<<<< HEAD
    resizeMode: "stretch",
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    shadowColor: Colors.shadow,
    elevation: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.white,
  },
  amountCon: {
    backgroundColor: Colors.red,
=======
    gap: 10,
    resizeMode: "stretch",
  },
  amountCon: {
    backgroundColor: "transparent",
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 15,
<<<<<<< HEAD
    paddingLeft: 20,
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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

export default memo(AmountCon);
