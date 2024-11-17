import { getCollectionReminder } from "@/databases/Database";
import { currency } from "@/global/currency";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Divider from "../Divider";
import { Link } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import Animated, { FadeInDown } from "react-native-reanimated";

const MoneySection = () => {
  const [reminderData, setReminderData] = useState<any>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const db = useSQLiteContext();

  useEffect(() => {
    async function getAmount() {
      if (db) {
        // Ensure db is available
        const result = await getCollectionReminder(db);
        setReminderData(result);
      }
    }
    getAmount();
  }, []);

  useEffect(() => {
    const total = reminderData?.reduce(
      (sum: number, record: any) => sum + record?.amount,
      0
    );
    setTotalAmount(total);
  }, [reminderData]);

  return (
    <Animated.View
      entering={FadeInDown.delay(100)
        .duration(200)
        .damping(80)
        .springify()
        .stiffness(200)}
      style={styles.container}
    >
      <View style={styles.subContainer}>
        <View style={styles.imgCon}>
          <Image
            style={styles.img}
            source={require("../../../assets/images/receiveBlue.png")}
          />
        </View>
        <View style={styles.textCon}>
          <Text style={styles.text1}>Collect Money 3x Faster</Text>
          <Text style={styles.textMoney}>
            {currency} {totalAmount}
            <Text style={styles.text2}>
              {" "}
              is with {reminderData?.length} Customer Set Date Now
            </Text>
          </Text>
        </View>
      </View>
      <Divider height={1} width={"100%"} aligns={"center"} />
      <Link
        href={{
          pathname: "/pages/Collection/SetCollectionDate",
          params: {},
        }}
        asChild
      >
        <TouchableOpacity style={styles.calender}>
          <Feather name="calendar" size={24} color={Colors.mainColor} />
          <Text style={styles.setText}>Set Collection Data</Text>
          <AntDesign name="right" size={18} color={Colors.mainColor} />
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: radius.regular,
    backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
  },
  imgCon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  textCon: {
    flex: 1,
    gap: 8,
  },
  text1: {
    fontSize: Fonts.medium,
    fontWeight: "500",
    color: Colors.mainColor,
  },
  textMoney: {
    fontSize: Fonts.medium,
    fontWeight: "700",
    lineHeight: 22,
  },
  text2: {
    fontSize: Fonts.regular,
    color: Colors.text,
    fontWeight: "400",
  },
  setText: {
    fontSize: Fonts.regular,
    color: Colors.mainColor,
    flex: 1,
  },
  calender: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.lavender,
    borderRadius: radius.medium,
    marginTop: 15,
    flexDirection: "row",
    gap: 10,
  },
});

export default MoneySection;
