import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { Fragment } from "react";
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

const Chip = () => {
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
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.container}>
              <Text>{item}</Text>
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
