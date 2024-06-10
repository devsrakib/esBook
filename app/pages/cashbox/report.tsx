import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Header from "@/components/UI/cashbox/Header";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Chip from "@/components/UI/cashbox/Chip";
import ReportCart from "@/components/UI/cashbox/ReportCart";

const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header title={"Report"} titleColor={Colors.white} height={70} />
      <View style={styles.bodyContainer}></View>
      <Chip />
      <FlatList
        contentContainerStyle={{
          gap: 15,
          paddingTop: 20,
          paddingBottom: 30,
        }}
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1]}
        renderItem={({ item }) => {
          return <ReportCart />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bodyContainer: {
    paddingTop: 10,
  },
});

export default Page;
