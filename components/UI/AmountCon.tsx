import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { getCash_buy, getCash_sell } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";
import { currency } from "@/global/currency";

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
  const [receive, setReceive] = useState<number>(0);
  const [cashBuyDue, setCashBuyDue] = useState<number>(0);

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

  console.log(receive);

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
            {currency} {receive?.toLocaleString('en-US') || '0'}
          </Text>
        </View>
      </View>
      <View style={styles.amountCon}>
        <Image style={styles.logo} source={logo2} />
        <View>
          <Text style={styles.text}>You will Give</Text>
          <Text style={styles.amount}>
            {currency} {cashBuyDue?.toLocaleString('en-US') || '0'}
          </Text>
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
