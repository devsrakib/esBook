import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import OwnerProfile from "../pages/profile/OwnerProfile";

const Page = () => {
  return (
    <View style={styles.container}>
      <OwnerProfile />
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
