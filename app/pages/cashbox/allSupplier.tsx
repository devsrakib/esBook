import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import { Colors } from "@/constants/Colors";
import CustomerAndSupplierList from "@/components/UI/CustomerAndSupplierList";

const page = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header
        children="All Supplier"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />
      <FlatList
        data={[1, 1, 1, 1, 1, 1, 1, 1]}
        renderItem={({ item }) => {
          return <CustomerAndSupplierList bg={Colors.background} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default page;
