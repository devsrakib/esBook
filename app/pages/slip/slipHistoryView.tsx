import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Header from "@/components/UI/header/Header";
import ProfileView from "@/components/UI/ProfileView";

const slipHistoryView = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header
        children="Slip History View"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />
      <View style={styles.body}>
        <ProfileView />
      </View>
    </View>
  );
};

export default slipHistoryView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
