import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Tab from "./Tab";
import { tabProps } from "@/app/(tabs)/Cash";
import { Colors } from "@/constants/Colors";

import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";

type props = {
  tab: tabProps[];
  selectedIndex: number;
  setSelectedIndex: Function;
  handleSearch: () => void;
  isOpenSearch: boolean;
};
const CustomTopTab = ({ tab, selectedIndex, setSelectedIndex, handleSearch, isOpenSearch }: props) => {
  
  return (
    <LinearGradient
      colors={[Colors.lightGray, Colors.linearSecond, Colors.linearThird]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
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
      {selectedIndex === 1 &&<View style={styles.searchContainer}>
<TouchableOpacity onPress={() => handleSearch()}  style={styles.search}>
 {isOpenSearch ? <Ionicons name="close" size={18} color={Colors.white} /> : <FontAwesome name="search" size={18} color="white" />}
</TouchableOpacity>
      </View>}
    </LinearGradient>
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
  searchContainer:{
    flex:1,
    alignItems:'flex-end',
    justifyContent:'center'
  },search:{
    borderRadius:radius.small,
    alignItems:'center',
    justifyContent:'center'
  }
});
