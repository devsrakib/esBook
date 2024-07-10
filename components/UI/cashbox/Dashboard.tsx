import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { sharedStyle } from "@/constants/shared.style";
import { Fonts } from "@/constants/Fonts";
import { useSQLiteContext } from "expo-sqlite";
import { getCash_sell, getDeposit } from "@/databases/Database";

const Dashboard = () => {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [collectedAmount, setCollectedAmount] = useState<any>([]);
  const [deposit, setDeposit] = useState<any>([]);

  const data = [
    {
      text: "Current Cash",
      amount: currentAmount,
      icon: require("../../../assets/images/cash.png"),
      color: Colors.mainColor,
      textColor: Colors.mainColor,
    },
    {
      text: "Today Sales",
      amount: "30,200",
      icon: require("../../../assets/images/cart.png"),
      color: Colors.orange,
      textColor: Colors.orange,
    },
    {
      text: "Today i Receive",
      amount: "30,200",
      icon: require("../../../assets/images/sales.png"),
      color: Colors.green,
      textColor: Colors.green,
    },
    {
      text: "Today I Gave",
      amount: "30,200",
      icon: require("../../../assets/images/coin.png"),
      color: Colors.red,
      textColor: Colors.red,
    },
  ];

  const db = useSQLiteContext();
  useEffect(() => {
    async function cash() {
      const cash = await getCash_sell(db);
      const deposit = await getDeposit(db);
      setDeposit(deposit);
      setCollectedAmount(cash);
    }
    cash();
  }, []);

  useEffect(() => {
    const totalSaleAmount = collectedAmount?.reduce(
      (sum: number, record: any) => sum + record?.collectedAmount,
      0
    );
    const totalDeposit = deposit?.reduce(
      (sum: number, record: any) => sum + record?.amount,
      0
    );
    setCurrentAmount(totalSaleAmount + totalDeposit);
  }, [collectedAmount, deposit]);

  // console.log(sellAmount);

  return (
    <View style={[sharedStyle.grid, { marginTop: 14 }]}>
      {data?.map((d, i) => {
        return (
          <View key={i} style={styles.subContainer}>
            <View style={styles.textCon}>
              <Text style={styles.text1}>{d.text}</Text>
              <Text style={[styles.textAmount, { color: d.textColor }]}>
                ${d.amount}
              </Text>
            </View>
            <View style={[styles.imgCon, { backgroundColor: d.color }]}>
              <Image style={styles.img} source={d.icon} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    width: "48.5%",
    backgroundColor: Colors.white,
    borderRadius: radius.medium,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
    height: 80,
  },
  imgCon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  img: {
    // width:
    resizeMode: "contain",
    width: 28,
    height: 28,
  },
  textCon: {
    flex: 1,
    gap: 5,
  },
  text1: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  textAmount: {
    fontSize: Fonts.large,
    fontWeight: "700",
  },
});

export default Dashboard;
