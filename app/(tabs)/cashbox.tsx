import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Cashbox from "../pages/cashbox/cashbox";

const cashbox = () => {
  return (
    <View style={styles.container}>
      <Cashbox />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default cashbox;
