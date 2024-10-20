import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import { getCashReport } from "@/databases/Database";
import { currency } from "@/global/currency";
import { Fonts } from "@/constants/Fonts";
import FormatDate from "@/utils/FormatDate";
import Empty from "@/components/UI/Empty";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const cashReport = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [cashReport, setCashReport] = useState<any>([]);
  const db = useSQLiteContext();

  useEffect(() => {
    async function cashReport() {
      const result = await getCashReport(db);
      setCashReport(result);
    }
    cashReport();
  }, []);

  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 200,
        }}
      />
      <Header
        textColor={Colors.white}
        children="Cash Report"
        backgroundColor={Colors.mainColor}
      />
      <View style={styles.content}>
        {cashReport?.length === 0 ? (
          <Empty
            icon={
              <MaterialCommunityIcons
                name="timer-sand-empty"
                size={30}
                color={Colors.text}
              />
            }
            text="No Cash Report"
          />
        ) : (
          <FlatList
            data={cashReport}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <View style={styles.imageAndTextContainer}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.image}
                        source={require("../../../assets/images/cashImage.png")}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Have Cashbox</Text>
                      <Text style={styles.date}>{FormatDate(item?.date)}</Text>
                    </View>
                  </View>
                  <Text style={styles.amount}>
                    {currency} {item?.totalCash?.toLocaleString("en-US")}
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
  },
  card: {
    height: 100,
    width: "90%",
    backgroundColor: Colors.white,

    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 12,
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  imageAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 28,
    height: 28,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lavender,
  },
  text: {
    fontSize: Fonts.medium,
    color: Colors.black,
    fontWeight: "bold",
  },
  date: {
    fontSize: Fonts.medium,
    color: Colors.text,
  },
  textContainer: {
    flexDirection: "column",
    gap: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    alignSelf: "center",
    // flex: 1,
  },
});

export default cashReport;
