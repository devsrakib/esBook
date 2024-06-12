import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Profile from "../pages/profile/profile";
import { Colors } from "@/constants/Colors";

const Page = () => {
  return (
    <View style={styles.container}>
      <Profile />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Page;
