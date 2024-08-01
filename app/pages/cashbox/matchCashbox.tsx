import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MatchTopSection from "@/components/UI/cashbox/MatchTopSection";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/components/UI/header/Header";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";
import { currency } from "@/global/currency";
import { Feather } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import Divider from "@/components/UI/Divider";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useSQLiteContext } from "expo-sqlite";
import { cash_report } from "@/databases/Database";

const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  const route = useLocalSearchParams<any>();
  const navigation = useRouter();
  const [inputCash, setInputCash] = useState<number>(0);
  const [isCardShow, setIsCardShow] = useState<boolean>(false);
  const [matchButton, setMatchButton] = useState<boolean>(false);
  const [lessButton, setLessButton] = useState<boolean>(false);
  const [balanced, setBalanced] = useState<boolean>(false);
  const [dummyText, setDummyText] = useState<string>("");
  const totalCash: any = parseFloat(route?.amount) || 0;

  const db = useSQLiteContext();

  const handleMatch = () => {
    setIsCardShow(true);
    navigation.push("/(tabs)/cashbox");
  };

  const handleLessButton = () => {
    console.log("okay");
    navigation.push("/(tabs)/cashbox");
  };

  const handleBalanced = async () => {
    await cash_report(db, { totalCash: totalCash });
    setBalanced(true);
    console.log(totalCash);
  };

  const label =
    inputCash > totalCash
      ? "Extra Cash"
      : inputCash < totalCash
      ? "Less Cash"
      : "Balanced";
  const difference = inputCash - totalCash;

  const handleButton = () => {
    if (inputCash > totalCash) {
      handleMatch();
    } else if (inputCash < totalCash) {
      setLessButton(true);
      handleLessButton();
    } else if (inputCash === totalCash) {
      handleBalanced();
      setBalanced(true);
    }
  };

  const handleNextButton = () => {
    if (inputCash > totalCash) {
      setMatchButton(true);
      setDummyText(
        "Additional amount will be entered as “Cash Sale (Combined)”"
      );
    } else if (inputCash < totalCash) {
      setLessButton(true);
      setDummyText(
        "Please match the cash by entering Cash Purchases, Expenses or Ownership."
      );
    } else if (inputCash === totalCash) {
      setBalanced(true);
      setDummyText("Your cashbox and current cash amount are equal");
    }
    setIsCardShow(true);
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
      <ScrollView style={{ flex: 1 }}>
        <Header
          textColor={Colors.white}
          children="Match Cashbox"
          backgroundColor={Colors.mainColor}
        />
        <View style={styles.topSection}>
          <MatchTopSection amount={totalCash} />
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
                onTouchEnd={() => {
                  setMatchButton(false), setIsCardShow(false);
                }}
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
        </View>
      </ScrollView>
      <Text numberOfLines={2} style={styles.dummyText}>
        {dummyText}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (matchButton || lessButton || balanced) {
            handleButton();
          } else {
            handleNextButton();
          }
        }}
      >
        <Text style={styles.buttonText}>
          {matchButton
            ? "Match"
            : lessButton
            ? "Okay"
            : balanced
            ? "Okay"
            : "Next"}
        </Text>
      </TouchableOpacity>
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
    textAlign: "center",
    marginVertical: 20,
  },
  dummyText: {
    fontSize: Fonts.medium,
    color: Colors.text,
    textAlign: "center",
    marginVertical: 20,
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
  button: {
    width: "90%",
    height: 45,
    borderRadius: radius.large,
    alignSelf: "center",
    backgroundColor: Colors.mainColor,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: "auto",
  },
  buttonText: {
    fontSize: Fonts.large,
    color: Colors.white,
  },
});

export default Page;
