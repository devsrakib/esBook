import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Inputs from "@/components/UI/parties/Inputs";
import AddPhoneBookButton from "./AddPhoneBookButton";
import { Colors } from "@/constants/Colors";
import ImageInput from "./ImageInput";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";

const Customers = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageInput />
        <AddPhoneBookButton />
        <Inputs />
        <Button
          title="Add New Customer"
          titleColor={Colors.white}
          bg={Colors.mainColor}
          radius={radius.regular}
          width={"100%"}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    gap: 30,
    paddingTop: 30,
    alignItems: "center",
  },
});

export default Customers;
