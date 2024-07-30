import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MatchTopSection from "@/components/UI/cashbox/MatchTopSection";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import Header from "@/components/UI/header/Header";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";
import { currency } from "@/global/currency";
import { Feather } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import Divider from "@/components/UI/Divider";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  const route = useLocalSearchParams<any>();
  const navigation = useNavigation<any>();
  const [inputCash, setInputCash] = useState<number>(0);
  const [isCardShow, setIsCardShow] = useState<boolean>(false);
  const amount = parseFloat(route?.amount) || 0;

  let restAmount: number;

  const handleMatch = () => {
    restAmount = inputCash - amount;
    console.log(restAmount);
    setIsCardShow(true);
    navigation.navigate("/pages/cashbox/cashbox");
  };

  const handleOk = () => {
    console.log("hello :::::::");
  };

  const label =
    inputCash > amount
      ? "Extra Cash"
      : inputCash < amount
      ? "Less Cash"
      : "Balanced";
  const difference = inputCash - amount;

  const handleButton = () => {
    if (label === "Extra Cash") {
      handleMatch();
    } else if (label === "Balanced") {
      handleOk();
    }
  };
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
        <MatchTopSection amount={amount} />
      </View>
      <View style={styles.bodySection}>
        <View style={styles.inputCon}>
          <Text style={styles.text}>Counting Cash</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: Fonts.large, fontWeight: "700" }}>
              {currency}
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onTouchEnd={() => setIsCardShow(false)}
              placeholder={`0.00`}
              onChangeText={(e) => setInputCash(parseFloat(e) || 0)}
            />
          </View>
        </View>
        <View style={styles.dummyCon}>
          <Feather name="info" size={12} color={Colors.text} />
          <Text style={styles.dummy}>
            Enter the total amount after counting the cash
          </Text>
        </View>
        {isCardShow && (
          <Animated.View
            entering={FadeInUp.delay(50).duration(600).springify()}
            exiting={FadeOutUp.delay(10).duration(600)}
            style={styles.totalCashCon}
          >
            <View style={styles.textCon}>
              <Text style={styles.text2}>Total Cashbox</Text>
              <Text>
                {currency} {inputCash.toFixed(2)}
              </Text>
            </View>
            <Divider height={1} width={"100%"} aligns={"center"} />
            <View style={styles.textCon}>
              <Text style={styles.text2}>{label}</Text>
              <Text>
                {currency} {Math.abs(difference).toFixed(2)}
              </Text>
            </View>
            <Text style={styles.appStatus}>App doesn't entry</Text>
          </Animated.View>
        )}
        <Button
          title={
            label === "Extra Cash"
              ? "Match"
              : label === "Balanced"
              ? "Ok"
              : "Next"
          }
          bg={Colors.mainColor}
          radius={radius.regular}
          width={"90%"}
          titleColor={Colors.white}
          onPress={() => handleButton()}
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
    justifyContent: "space-between",
  },
  input: {
    fontSize: Fonts.medium,
    height: "100%",
    width: Dimensions.get("window").width * 0.2,
    textAlign: "center",
  },
  text: {
    fontSize: Fonts.large,
    fontStyle: "italic",
    color: Colors.text,
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
