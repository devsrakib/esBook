import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { Fragment, useState } from "react";
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
}: {
  setSelectedChip: Function;
  title: any;
  selectedChip: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  console.log(title, "====", selectedChip);

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
                  selectedIndex === index || title === selectedChip
                    ? Colors.black
                    : Colors.background2,
              },
            ]}
          >
            <Text
              style={{
                color:
                  selectedIndex === index || title === selectedChip
                    ? Colors.white
                    : Colors.black,
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

export default Chip;
