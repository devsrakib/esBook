import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { Fragment } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";

const inputs = [
  {
    label: "Full Name",
    icon: <Feather name="user" size={24} color="black" />,
  },
  {
    label: "Email",
    icon: (
      <MaterialCommunityIcons name="email-outline" size={24} color="black" />
    ),
  },
  {
    label: "Phone",
    icon: <Feather name="phone" size={24} color="black" />,
  },
  {
    label: "Address",
    icon: <SimpleLineIcons name="location-pin" size={24} color="black" />,
  },
];
const Inputs = () => {
  return (
    <View style={styles.container}>
      {inputs?.map((i) => {
        return (
          <Fragment>
            <Text style={styles.label}>{i.label}</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconCon}>{i.icon}</View>
              <TextInput style={styles.input} placeholder="Type here" />
            </View>
          </Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // gap: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: radius.regular,
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
