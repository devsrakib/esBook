import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { ICustomerDataInput } from "@/types/interfaces/input.interface";
import { CustomerData, SupplierData } from "@/databases/Database";
import Animated, { FadeInDown } from "react-native-reanimated";

const inputs = [
  {
    label: "Full Name",
    icon: <Feather name="user" size={24} color="black" />,
    key: "name",
  },
  {
    label: "Email",
    icon: (
      <MaterialCommunityIcons name="email-outline" size={24} color="black" />
    ),
    key: "email",
  },
  {
    label: "Phone",
    icon: <Feather name="phone" size={24} color="black" />,
    key: "phone",
  },
  {
    label: "Address",
    icon: <SimpleLineIcons name="location-pin" size={24} color="black" />,
    key: "address",
  },
];

interface InputProps {
  setData: React.Dispatch<React.SetStateAction<CustomerData | SupplierData>>;
}
const Inputs: React.FC<InputProps> = ({ setData }) => {
  const handleChange = (key: any, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <Animated.View
      entering={FadeInDown.damping(80).duration(400).springify().stiffness(200)}
      style={styles.container}
    >
      {inputs?.map((input) => (
        <React.Fragment key={input.key}>
          <Text style={styles.label}>{input.label}</Text>
          <View style={styles.inputContainer}>
            <View style={styles.iconCon}>{input.icon}</View>
            <TextInput
              onChangeText={(value) => handleChange(input.key, value)}
              style={styles.input}
              placeholder={`Enter ${input.key}`}
            />
          </View>
        </React.Fragment>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // gap: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: radius.small,
    width: "100%",
    flexDirection: "row",
    height: 50,
    backgroundColor: Colors.white,
    marginTop: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: Fonts.regular,
    fontWeight: "500",
    color: Colors.labelText,
  },
  iconCon: {
    backgroundColor: Colors.background,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  input: {
    paddingHorizontal: 10,
    fontSize: Fonts.medium,
    flex: 1,
  },
});

export default Inputs;
