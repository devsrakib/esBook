import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import Inputs from "@/components/UI/parties/Inputs";
import AddPhoneBookButton from "./AddPhoneBookButton";
import { Colors } from "@/constants/Colors";
import ImageInput from "./ImageInput";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";
import { useSQLiteContext } from "expo-sqlite";
import { createCustomers, CustomerData } from "@/databases/Database";
import { useRouteNode } from "expo-router/build/Route";
import { router, useRouter } from "expo-router";
import axios from "axios";
import useApiHook, { apiUrl } from "@/hooks/all_api_hooks";

const Customers = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [customerData, setCustomerData] = useState<CustomerData>({
    profile_photo: selectedImage ? selectedImage : "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const db = useSQLiteContext();
  const { data: getOwner } = useApiHook("owners");
  const ownerData = getOwner?.results[0];
  console.log(ownerData?.id);

  const navigate = useRouter();
  useEffect(() => {
    setCustomerData((prevData) => ({
      ...prevData,
      profile_photo: selectedImage ? selectedImage : "",
    }));
  }, [selectedImage]);

  const handleSave = async () => {
    // console.log("clicked customer");
    console.log(customerData);
    console.log(apiUrl + "customers/");

    try {
      const createCustomer = await axios.post(apiUrl + "customers/", {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        profile_photo: selectedImage, // optional, can be null
        owner: ownerData?.id,
      });

      // const result = await createCustomers(db, customerData);
      // console.log(result?.id);

      if (createCustomer.status === 201) {
        console.log(createCustomer, "customer created");
        // router.push("/(tabs)");
      }

      // if (result.success) {
      //   // navigate.push("/(tabs)/parties");
      //   ToastAndroid.show("Customer created successfully!", ToastAndroid.SHORT);
      // } else if (!result.success) {
      //   ToastAndroid.show(result.message, ToastAndroid.SHORT);
      // }
    } catch (error) {
      ToastAndroid.show("Something went wrong!😭", ToastAndroid.SHORT);
      console.log(error?.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.container}>
        <ImageInput
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <Inputs setData={setCustomerData} />
        <Button
          title="Add New Customer"
          titleColor={Colors.white}
          bg={Colors.mainColor}
          radius={radius.small}
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
