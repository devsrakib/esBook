import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Tab from "./Tab";
import { tabProps } from "@/app/(tabs)/Cash";
import { Colors } from "@/constants/Colors";

type props = {
  tab: tabProps[];
  selectedIndex: number;
  setSelectedIndex: Function;
};
const CustomTopTab = ({ tab, selectedIndex, setSelectedIndex }: props) => {
  return (
    <View style={styles.container}>
      {tab?.map((item, index: number) => {
        const isSelected = selectedIndex === index;
        return (
          <Tab
            key={index}
            item={item}
            isSelected={isSelected}
            setSelectedIndex={setSelectedIndex}
            index={index}
          />
        );
      })}
    </View>
  );
};

export default CustomTopTab;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.mainColor,
  },
});
