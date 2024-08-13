import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/UI/cashbox/Header";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReportCart from "@/components/UI/cashbox/ReportCart";
import { getCash_buy, getCash_sell } from "@/databases/Database";
import Empty from "@/components/UI/Empty";
import { MaterialIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { radius } from "@/constants/sizes";

const tabs = ["Customer Due", "Supplier Due"];
const DueReport = ({ where }: { where: string }) => {
  const { bottom, top } = useSafeAreaInsets();
  const [dueReport, setDueReport] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const db = useSQLiteContext();

  useEffect(() => {
    async function getDue() {
      if (selectedIndex === 0) {
        const due = (await getCash_sell(db)).filter(
          (item: any) => item?.dueAmount > 0
        );
        setDueReport(due);
      } else if (selectedIndex === 1) {
        const due = (await getCash_buy(db)).filter(
          (item: any) => item?.dueAmount > 0
        );
        setDueReport(due);
      }
    }

    getDue();
  }, [selectedIndex]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: where !== "report" ? top : 0,
          paddingBottom: where !== "report" ? bottom : 0,
        },
      ]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      {where !== "report" && (
        <Header title="Due" titleColor={Colors.white} height={70} />
      )}
      <View
        style={[
          styles.tabContainer,
          { marginTop: where !== "report" ? 10 : 0 },
        ]}
      >
        {tabs?.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor:
                  index === selectedIndex ? Colors.mainColor : Colors.white,
              },
            ]}
            key={index}
            onPress={() => setSelectedIndex(index)}
          >
            <Text
              style={{
                color:
                  index === selectedIndex ? Colors.white : Colors.mainColor,
                fontSize: 16,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedIndex === 0 ? (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          {dueReport.length === 0 ? (
            <Empty
              text="No Due"
              icon={
                <MaterialIcons
                  name="hourglass-empty"
                  size={40}
                  color={Colors.text}
                />
              }
            />
          ) : (
            <FlatList
              data={dueReport}
              contentContainerStyle={{
                paddingTop: 10,
                gap: 10,
                paddingBottom: 10,
              }}
              renderItem={({ item }) => <ReportCart item={item} text="Due" />}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          {dueReport.length === 0 ? (
            <Empty
              text="No Due"
              icon={
                <MaterialIcons
                  name="hourglass-empty"
                  size={40}
                  color={Colors.text}
                />
              }
            />
          ) : (
            <FlatList
              data={dueReport}
              contentContainerStyle={{
                paddingTop: 10,
                gap: 10,
                paddingBottom: 10,
              }}
              renderItem={({ item }) => (
                <ReportCart
                  item={item}
                  text="Due"
                  selectedIndex={selectedIndex}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    gap: 10,
    width: Dimensions.get("window").width * 0.5,
  },
  tab: {
    height: 30,
    borderWidth: 1,
    borderColor: Colors.mainColor,
    borderRadius: radius.small,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 5,
  },
});

export default DueReport;
