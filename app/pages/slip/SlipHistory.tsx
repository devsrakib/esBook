import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HistoryCard from "@/components/slip/HistoryCard";

const SlipHistory = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header
        children="Slip History"
        textColor={Colors.white}
        backgroundColor={Colors.mainColor}
      />
      <FlatList
        data={[1, 1, 1, 1.1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        renderItem={({ item }) => {
          return <HistoryCard />;
        }}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
      />
    </View>
  );
};

export default SlipHistory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  columnWrapper: {
    gap: 16, // Add vertical space between rows
  },
});
