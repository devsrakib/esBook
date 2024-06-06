import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import UserViewHome from "@/components/UI/UserViewHome";
import Chart from "@/components/UI/Chart";
import AmountCon from "@/components/UI/AmountCon";
import Dashboard from "@/components/UI/Dashboard";
import CustomerList from "@/components/UI/CustomerList";

const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[Styles.container]}>
        <UserViewHome />
        <AmountCon />
        <Dashboard />
        <Chart />
        <CustomerList />
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    gap: 20,
  },
});

export default Home;
