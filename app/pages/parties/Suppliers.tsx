import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import ImageInput from "./ImageInput";
import AddPhoneBookButton from "./AddPhoneBookButton";
import Inputs from "@/components/UI/parties/Inputs";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";

const Suppliers = () => {
  const handleLog = () => {
    console.log("supplier");
  };
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
          onPress={() => {
            handleLog();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 30,
    paddingTop: 30,
  },
});

export default Suppliers;
