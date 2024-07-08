import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import ImageInput from "./ImageInput";
import AddPhoneBookButton from "./AddPhoneBookButton";
import Inputs from "@/components/UI/parties/Inputs";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";
import { useSQLiteContext } from "expo-sqlite";
import { createSuppliers, SupplierData } from "@/databases/Database";

const Suppliers = () => {
  const [supplierData, setSupplierData] = useState<SupplierData>({
    profilePhoto: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    createdAt: "",
  });

  const db = useSQLiteContext();

  const handleSave = async () => {
    const { name, email, phoneNumber, address } = supplierData;
    if (!name || !email || !phoneNumber || !address) {
      return;
    } else {
      await createSuppliers(db, supplierData);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageInput />
        <AddPhoneBookButton />
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
