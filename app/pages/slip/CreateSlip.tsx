import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/slip/Header.createSlip";
import SlipCard from "@/components/slip/SlipCard";

const CreateSlip = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Header />

      <View style={styles.body}>
        <FlatList
          data={Array(101)}
          contentContainerStyle={styles.content}
          renderItem={({ item }) => {
            return <SlipCard />;
          }}
        />
      </View>
    </View>
  );
};

export default CreateSlip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
  body: {
    paddingTop: 16,
  },
  content: {
    gap: 10,
  },
});
