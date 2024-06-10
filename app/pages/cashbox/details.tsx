import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/cashbox/Header";
import { Colors } from "@/constants/Colors";
import SearchCustomerAndAddCustomer from "@/components/UI/cashbox/SearchCustomerAndAddCustomer";
import { Feather } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import Button from "@/components/UI/Button";

const page = () => {
  const route = useLocalSearchParams();
  const { bottom, top } = useSafeAreaInsets();
  console.log(route);
  const handlelog = () => {
    console.log("hello");
  };
  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.headerSection}>
        <Header height={70} title={route.text} titleColor={Colors.white} />
        {(route.text === "Cash Sell" || route.text === "Due") && (
          <SearchCustomerAndAddCustomer />
        )}
      </View>
      <View style={styles.bodySection}>
        <View style={styles.dummyTextCon}>
          <Feather name="info" size={18} color={Colors.text} />
          <Text numberOfLines={1} style={styles.dummyText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing ...adipiscing
            elit...
          </Text>
        </View>
      </View>
      <Button
        title="save"
        radius={radius.large}
        titleColor={Colors.white}
        bg={Colors.mainColor}
        onPress={() => handlelog()}
        width={"90%"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    backgroundColor: Colors.mainColor,
  },
  bodySection: {},
  dummyTextCon: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
    paddingVertical: 20,
  },
  dummyText: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
});

export default page;
