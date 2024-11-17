import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Tab from "./Tab";
import { tabProps } from "@/app/(tabs)/Cash";
import { Colors } from "@/constants/Colors";
<<<<<<< HEAD
import { LinearGradient } from "expo-linear-gradient";
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

type props = {
  tab: tabProps[];
  selectedIndex: number;
  setSelectedIndex: Function;
};
const CustomTopTab = ({ tab, selectedIndex, setSelectedIndex }: props) => {
  return (
<<<<<<< HEAD
    <LinearGradient
      colors={["#168F88", "#006B60", "#4D89A1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
=======
    <View style={styles.container}>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
<<<<<<< HEAD
    </LinearGradient>
=======
    </View>
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
