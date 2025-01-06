

import { View, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";
import axios from "axios";
import useApiHook, { apiUrl } from "@/hooks/all_api_hooks";
import { getToken } from "@/utils/getToken";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchSupplier } from "@/redux/features/supplier/supplierSlice";

const SupplierEdit = () => {
  const { top } = useSafeAreaInsets();

  const [formData, setFormData] = useState({
    store_Name: "",
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams();

  // Fetch supplier data
 const dispatch = useAppDispatch()
   const {suppliers:data, loading: SupplierLoading, error} = useAppSelector(state => state.suppliers);
  
   
   useEffect(() =>{
  dispatch(fetchSupplier({supplierId: `${params.id}`}))
   }, [])

  useEffect(() => {
    if (data) {
      setFormData({
        store_Name: data?.store_name || "",
        name: data?.name || "",
        phone: data?.phone || "",
        address: data?.address || "",
      });
    }
  }, [data]);

  // Handle input change dynamically
  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update supplier data
  const updateSupplier = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.put(
        `${apiUrl}suppliers/${params?.id}/`,
        {
          store_name: formData?.store_Name,
          name: formData?.name,
          phone: formData?.phone,
          address: formData?.address,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Success", "Supplier information updated successfully!");
    } catch (error) {
      console.error("Error updating supplier data:", error);
      Alert.alert("Error", "Failed to update supplier information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Header
        children="Seller Information"
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />
      <ScrollView contentContainerStyle={styles.form}>
        {/* Shop Name */}
        <Animated.Text style={styles.label}>Shop Name</Animated.Text>
        <TextInput
          style={styles.input}
          placeholder={data?.store_name}
          placeholderTextColor={Colors.text}
          value={formData?.store_Name}
          onChangeText={(text) => handleInputChange("store_Name", text)}
        />

        {/* Owner Name */}
        <Animated.Text style={styles.label}>Owner Name</Animated.Text>
        <TextInput
          style={styles.input}
          placeholder={data?.name}
          placeholderTextColor={Colors.text}
          value={formData?.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />

        {/* Phone Number */}
        <Animated.Text style={styles.label}>Phone Number</Animated.Text>
        <TextInput
          style={styles.input}
          placeholder={data?.phone}
          placeholderTextColor={Colors.text}
          keyboardType="phone-pad"
          value={formData?.phone}
          onChangeText={(text) => handleInputChange("phone", text)}
        />

        {/* Location */}
        <Animated.Text style={styles.label}>Location</Animated.Text>
        <TextInput
          style={styles.input}
          placeholder={data?.address}
          placeholderTextColor={Colors.text}
          value={formData?.address}
          onChangeText={(text) => handleInputChange("address", text)}
        />

        {/* Update Button */}
        <Animated.View style={styles.buttonCon}>
          <Button
            title={loading ? "Updating..." : "Update"}
            onPress={updateSupplier}
            bg={Colors.mainColor}
            radius={radius.small}
            width={'100%'}
            titleColor={Colors.white}
            // disabled={loading}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default SupplierEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.page_bg,
  },
  form: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: Colors.mainColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  buttonCon: {
    marginTop: 'auto',
  },
});
