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

const Suppliers = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [supplierData, setSupplierData] = useState<SupplierData>({
    profilePhoto: selectedImage ? selectedImage : "",
    name: "",
    email: "",
    phoneNumber: "",
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
  const handleSave = async () => {
    try {
      const result = await createSuppliers(db, supplierData);
      if (result.success) {
        navigate.push("/(tabs)/parties");
        ToastAndroid.show("Supplier created successfully!", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show("Something went wrong!😭", ToastAndroid.SHORT);
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
