import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Header from "@/components/UI/header/Header";
import { radius } from "@/constants/sizes";
import MoneySection from "@/components/UI/Collection_component/MoneySection";
import Customers from "../parties/Customers";
import Suppliers from "../parties/Suppliers";
import TabComponent from "@/components/UI/CustomerTab";
import All from "./All";
import Today from "./Today";
import Upcoming from "./Upcoming";
import Animated, { FadeInDown } from "react-native-reanimated";

const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs: string[] = ["All", "Today", "Upcoming"];
  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header
        children="Collection"
        textColor={Colors.white}
        backgroundColor={Colors.mainColor}
      />
      {/* main body section */}
      <View style={styles.bodySection}>
        <Animated.View style={styles.topSection}>
          <MoneySection />
          <TabComponent
            tabs={tabs}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </Animated.View>
      </View>

      <View style={styles.componentSection}>
        {activeTab === 0 ? (
          <All />
        ) : activeTab === 1 ? (
          <Today />
        ) : (
          activeTab === 2 && <Upcoming />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bodySection: {
    flex: 1,
  },
  topSection: {
    backgroundColor: Colors.mainColor,
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomRightRadius: radius.regular,
    borderBottomLeftRadius: radius.regular,
  },
  componentSection: {
    flex: 1,
  },
});

export default Page;
