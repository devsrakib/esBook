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
import { getToken } from "@/utils/getToken";
import BottomToast from "@/components/UI/shared/CustomModal";

const Customers = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [customerData, setCustomerData] = useState<CustomerData>({
    profile_photo: selectedImage ? selectedImage : "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const db = useSQLiteContext();

  const navigate = useRouter();
  useEffect(() => {
    setCustomerData((prevData) => ({
      ...prevData,
      profile_photo: selectedImage ? selectedImage : "",
    }));
  }, [selectedImage]);

  const handleSave = async () => {
    console.log(customerData); // Log the customer data
    console.log(apiUrl + "customers/"); // Log the API URL

    try {
      // Get the token from AsyncStorage
      const token = await getToken();
      console.log(await token, "token");

      // Check if token exists
      if (!token) {
        console.log("No token found, cannot create customer.");
        ToastAndroid.show(
          "You must be logged in to create a customer!",
          ToastAndroid.SHORT
        );
        return; // If no token, exit early
      }

      // Sending the POST request to create the customer
      const createCustomer = await axios.post(
        apiUrl + "customers/",
        {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          address: customerData.address,
          profile_photo: selectedImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Sending the token to authenticate the user
          },
        }
      );

      // Check if the response status is 201 (created)
      if (createCustomer.status === 201) {
        // Navigate or show a success message
        setMessage("customer create successfully");
        // Optionally, navigate to another screen or update your UI
      }
    } catch (error: any) {
      // Handle any errors that occur during the request
      // ToastAndroid.show("Something went wrong!😭", ToastAndroid.SHORT);
      console.log(error?.message, ";;;;;;;;");
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
      <BottomToast message={message} visible={true} bg_color={Colors.gray} />
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
