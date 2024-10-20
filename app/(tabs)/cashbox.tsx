import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { headerHeightWidth, radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import Dashboard from "@/components/UI/cashbox/Dashboard";
import CashboxFeature from "@/components/UI/cashbox/CashboxFeature";
import { Link, Stack } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import Header from "@/components/UI/cashbox/cashbox.header";

export const Cashbox = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [currentCash, setCurrentCash] = useState<number>(0);
  const handleCurrentCash = useCallback((amount: number) => {
    setCurrentCash(amount);
  }, []);
  return (
    <View style={[styles.container]}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 200,
        }}
      />
      <ScrollView>
        <View style={styles.bodySection}>
          <Header currentCash={currentCash} />
          <Dashboard setCurrentCash={handleCurrentCash} />
          <CashboxFeature />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },

  bodySection: {
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
});

export default Cashbox;
