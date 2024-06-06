import { View, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import UserViewHome from "@/components/UI/UserViewHome";
import Chart from "@/components/UI/Chart";
import AmountCon from "@/components/UI/AmountCon";

const Home = () => {
  return (
    <View style={[Styles.container]}>
      <UserViewHome />
      <AmountCon />
      <Chart />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
    gap: 20,
  },
});

export default Home;
