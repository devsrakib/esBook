<<<<<<< HEAD
import { View, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
=======
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import React from "react";
import { Stack } from "expo-router";
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
import { Colors } from "@/constants/Colors";
import Header from "@/components/UI/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import Button from "@/components/UI/Button";
import { radius } from "@/constants/sizes";
<<<<<<< HEAD
import axios from "axios";
import useApiHook, { apiUrl } from "@/hooks/all_api_hooks";
import { getToken } from "@/utils/getToken";

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
  // console.log(pa);

  const { data } = useApiHook(`suppliers/${params?.id}/`);
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
=======
const SupplierEdit = () => {
  const { top } = useSafeAreaInsets();
  const CustomTextInput = Animated.createAnimatedComponent(TextInput);
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_right",
          animationDuration: 100,
        }}
      />

      <Header
<<<<<<< HEAD
        children="Edit Seller Info"
=======
        children="Seller information"
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />

      <ScrollView contentContainerStyle={styles.form}>
        {/* Shop Name */}
<<<<<<< HEAD
        <Animated.Text style={styles.label}>Shop Name</Animated.Text>
        <TextInput
          style={styles.input}
          placeholder={data?.store_name}
          placeholderTextColor={Colors.text}
          value={formData?.shopName}
          onChangeText={(text) => handleInputChange("store_Name", text)}
        />

        {/* Owner Name */}
        <Animated.Text style={styles.label}>Owner Name</Animated.Text>
        <TextInput
          style={styles.input}
          placeholder={data?.name}
          placeholderTextColor={Colors.text}
          value={formData?.ownerName}
          onChangeText={(text) => handleInputChange("name", text)}
        />

        {/* Phone Number */}
        <Animated.Text style={styles.label}>Phone Number</Animated.Text>
        <TextInput
          style={styles.input}
          placeholder={data?.phone}
          placeholderTextColor={Colors.text}
          keyboardType="phone-pad"
          value={formData?.phoneNumber}
          onChangeText={(text) => handleInputChange("phone", text)}
        />

        {/* Location */}
        <Animated.Text style={styles.label}>Location</Animated.Text>
        <TextInput
          style={styles.input}
          placeholder={data?.address}
          placeholderTextColor={Colors.text}
          value={formData?.location}
          onChangeText={(text) => handleInputChange("address", text)}
        />

        <Animated.View style={styles.buttonCon}>
          <Button
            title={loading ? "Updating..." : "Update"}
=======
        <Animated.Text
          entering={FadeInDown.delay(100).duration(400).damping(80).springify()}
          style={styles.label}
        >
          Shop Name
        </Animated.Text>
        <CustomTextInput
          entering={FadeInDown.delay(100).duration(400).damping(80).springify()}
          style={styles.input}
          placeholder="Enter shop name"
          placeholderTextColor={Colors.text}
        />

        {/* Owner Name */}
        <Animated.Text
          entering={FadeInDown.delay(150).duration(400).damping(80).springify()}
          style={styles.label}
        >
          Owner Name
        </Animated.Text>
        <CustomTextInput
          entering={FadeInDown.delay(150).duration(400).damping(80).springify()}
          style={styles.input}
          placeholder="Enter owner name"
          placeholderTextColor={Colors.text}
        />

        {/* Phone Number */}
        <Animated.Text
          entering={FadeInDown.delay(200).duration(400).damping(80).springify()}
          style={styles.label}
        >
          Phone Number
        </Animated.Text>
        <CustomTextInput
          entering={FadeInDown.delay(200).duration(400).damping(80).springify()}
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor={Colors.text}
          keyboardType="phone-pad"
        />

        {/* Location */}
        <Animated.Text
          entering={FadeInDown.delay(250).duration(400).damping(80).springify()}
          style={styles.label}
        >
          Location
        </Animated.Text>
        <CustomTextInput
          entering={FadeInDown.delay(250).duration(400).damping(80).springify()}
          style={styles.input}
          placeholder="Enter location"
          placeholderTextColor={Colors.text}
        />
        <Animated.View
          entering={FadeInDown.delay(300).duration(400).damping(80).springify()}
          style={styles.buttonCon}
        >
          <Button
            title="Update"
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
            titleColor={Colors.white}
            bg={Colors.mainColor}
            radius={radius.small}
            width={"100%"}
<<<<<<< HEAD
            onPress={updateSupplier}
            // disabled={loading}
=======
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
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
    marginTop: 100,
  },
});
