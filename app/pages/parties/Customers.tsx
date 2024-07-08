import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Inputs from "@/components/UI/parties/Inputs";
import AddPhoneBookButton from "./AddPhoneBookButton";
import { Colors } from "@/constants/Colors";
import ImageInput from "./ImageInput";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";
import { useSQLiteContext } from "expo-sqlite";
import { createCustomers, CustomerData } from "@/databases/Database";

const Customers = () => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const db = useSQLiteContext();

  const handleSave = async () => {
    await createCustomers(db, customerData);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageInput />
        <AddPhoneBookButton />
        <Inputs setData={setCustomerData} />
        <Button
          title="Add New Customer"
          titleColor={Colors.white}
          bg={Colors.mainColor}
          radius={radius.regular}
          width={"100%"}
          onPress={handleSave}
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
