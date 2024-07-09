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

const Chip = ({ setSelectedChip }: { setSelectedChip: Function }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <Fragment>
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
                    selectedIndex === index ? Colors.black : Colors.background2,
                },
              ]}
            >
              <Text
                style={{
                  color: selectedIndex === index ? Colors.white : Colors.black,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </Fragment>
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
