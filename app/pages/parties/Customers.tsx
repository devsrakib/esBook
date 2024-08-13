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
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [customerData, setCustomerData] = useState<CustomerData>({
    profilePhoto: selectedImage ? selectedImage : "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const db = useSQLiteContext();

  useEffect(() => {
    setCustomerData((prevData) => ({
      ...prevData,
      profilePhoto: selectedImage ? selectedImage : "",
    }));
  }, [selectedImage]);

  const handleSave = async () => {
    await createCustomers(db, customerData);
  };
  console.log("image:::::::::::", selectedImage);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.container}>
        <ImageInput
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
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
