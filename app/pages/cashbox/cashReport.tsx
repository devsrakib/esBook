import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";

const cashReport = () => {
  const { bottom, top } = useSafeAreaInsets();
  const db = useSQLiteContext();
  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <Header
        textColor={Colors.white}
        children="Cash Report"
        backgroundColor={Colors.mainColor}
      />
      <View style={styles.content}>
        <FlatList
          data={Array(10)}
          renderItem={({ item }) => {
            return <Text>item</Text>;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default cashReport;
