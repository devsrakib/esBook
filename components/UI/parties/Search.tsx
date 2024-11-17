import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Fontisto } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";

const Search = ({
  searchTerm,
  setSearchTerm,
  setFocusInput,
}: {
  searchTerm: string;
  setSearchTerm: Function;
  setFocusInput: Function;
}) => {
  return (
    <Animated.View entering={FadeInUp} style={styles.searchSection}>
      <Fontisto name="search" size={18} color={Colors.text} />
      <TextInput
        placeholder="Search..."
        style={styles.input}
        onChangeText={(text) => setSearchTerm(text)} // Update search term
        value={searchTerm}
      />
    </Animated.View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchSection: {
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: radius.regular,
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.text,
    elevation: 10,
  },
  input: {
    fontSize: Fonts.medium,
    flex: 1,
  },
});
