import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MatchTopSection from "@/components/UI/cashbox/MatchTopSection";
import { Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";
import { currency } from "@/global/currency";
import { Feather } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import Divider from "@/components/UI/Divider";

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
      <Header
        textColor={Colors.white}
        children="Match Cashbox"
        backgroundColor={Colors.mainColor}
      />
      <View style={styles.topSection}>
        <MatchTopSection />
      </View>
      <View style={styles.bodySection}>
        <View style={styles.inputCon}>
          <TextInput style={styles.input} placeholder="Match Cashbox" />
          <View>
            <Text style={styles.text}>{currency}1000</Text>
          </View>
        </View>
        <View style={styles.dummyCon}>
          <Feather name="info" size={12} color={Colors.text} />
          <Text style={styles.dummy}>
            Enter the total amount after counting the cash
          </Text>
        </View>
        <View style={styles.totalCashCon}>
          <View style={styles.textCon}>
            <Text style={styles.text2}>Total Cashbox</Text>
            <Text>{currency}1000</Text>
          </View>
          <Divider height={1} width={"100%"} aligns={"center"} />
          <View style={styles.textCon}>
            <Text style={styles.text2}>Extra Cash</Text>
            <Text>{currency}1000</Text>
          </View>
          <Text style={styles.appStatus}>App doesn't entry</Text>
        </View>
        <Button
          title="Next"
          bg={Colors.mainColor}
          radius={radius.regular}
          width={"90%"}
          titleColor={Colors.white}
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
  topSection: {
    backgroundColor: Colors.mainColor,
  },
  bodySection: {
    width: "90%",
    alignSelf: "center",
    flex: 1,
  },
  inputCon: {
    borderWidth: 1,
    borderRadius: radius.medium,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    marginTop: 20,
    marginBottom: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: Fonts.medium,
    height: "100%",
  },
  text: {
    fontSize: Fonts.large,
    fontWeight: "bold",
  },
  dummyCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dummy: {
    fontSize: 12,
    color: Colors.text,
  },
  totalCashCon: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: radius.regular,
    padding: 16,
    marginTop: 30,
  },
  textCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  appStatus: {
    fontStyle: "italic",
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  text2: {
    fontSize: Fonts.medium,
    color: Colors.text,
  },
});
export default Page;
