import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import ImageInput from "./ImageInput";
import AddPhoneBookButton from "./AddPhoneBookButton";
import Inputs from "@/components/UI/parties/Inputs";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";
import { useSQLiteContext } from "expo-sqlite";
import { createSuppliers, SupplierData } from "@/databases/Database";
import { useRouter } from "expo-router";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { apiUrl } from "@/hooks/all_api_hooks";
import BottomToast from "@/components/UI/shared/CustomModal";

const Suppliers = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState<boolean>(false);
  const [supplierData, setSupplierData] = useState<SupplierData>({
    profile_photo: selectedImage ? selectedImage : "",
    name: "",
    store_name: "",
    email: "",
    phone: "",
    address: "",
    createdAt: "",
  });
  const navigate = useRouter();
  const db = useSQLiteContext();
  useEffect(() => {
    setSupplierData((prevData) => ({
      ...prevData,
      profilePhoto: selectedImage ? selectedImage : "",
    }));
  }, [selectedImage]);
  // console.log(selectedImage);

  const handleSave = async () => {
    try {
      const token = await getToken();

      if (!token) {
        ToastAndroid.show(
          "You must be logged in to create a customer!",
          ToastAndroid.SHORT
        );
        return;
      }

      // Create FormData for the request
      const formData = new FormData();
      formData.append("name", supplierData.name);

      formData.append("store_name", supplierData.store_name);
      formData.append("email", supplierData.email);
      formData.append("phone", supplierData.phone);
      formData.append("address", supplierData.address);

      // Ensure `selectedImage` is a valid file object
      if (selectedImage) {
        formData.append("profile_photo", {
          uri: selectedImage,
          type: "image/jpeg", // Adjust the MIME type as needed
          name: "profile_photo.jpg", // Set a file name
        });
      }

      // Send the POST request with FormData
      const response = await axios.post(apiUrl + "suppliers/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Set content type
        },
      });

      if (response.status === 201) {
        setMessage("Customer created successfully");
        setIsError(false);
        console.log(response?.data, "Response Data");
      }
    } catch (error: any) {
      const errorData = error?.response?.data;
      console.log("Error:", error?.message);

      if (errorData) {
        const firstKey = Object.keys(errorData)[0];
        const errorMessage = errorData[firstKey][0];
        console.log(`${firstKey}: ${errorMessage}`);

        setMessage(`${firstKey}: ${errorMessage}`);
        setIsError(true);
      } else {
        setMessage("An unexpected error occurred.");
        setIsError(true);
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.container}>
        <ImageInput
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <Inputs setData={setSupplierData} />
        <Button
          title="Add New Supplier"
          titleColor={Colors.white}
          bg={Colors.mainColor}
          radius={radius.regular}
          width={"100%"}
          onPress={() => {
            handleSave();
          }}
        />
      </View>
      <BottomToast message={message} visible={isError} />
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
