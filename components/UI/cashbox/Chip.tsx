import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { Fragment, memo, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";

const items = [
  "Cash Sell",
  "Due",
  "Cash buy",
  "Expenses",
  "Deposited",
  "Withdraw",
];

const Chip = ({
  setSelectedChip,
  title,
  selectedChip,
  routerIndex,
}: {
  setSelectedChip: Function;
  title: string | string[];
  selectedChip: any;
  routerIndex: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (routerIndex !== undefined) {
      setSelectedIndex(routerIndex);
    }
  }, [routerIndex]);
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 10,
      }}
      data={items}
      renderItem={({ item, index }) => {
        console.log(typeof routerIndex, typeof index);
        console.log(routerIndex === index);
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedChip(item);
              setSelectedIndex(index);
            }}
            style={[
              styles.container,
              {
                backgroundColor:
                  selectedIndex === index || Number(routerIndex) === index
                    ? Colors.mainColor
                    : Colors.background2,
              },
            ]}
          >
            <Text
              style={{
                color:
                  selectedIndex === index || Number(routerIndex) === index
                    ? Colors.white
                    : Colors.mainColor,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background2,
    height: 32,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default memo(Chip);
