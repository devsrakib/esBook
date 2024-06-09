import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { Link } from "expo-router";
const SearchCustomerAndAddCustomer = () => {
  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: "/pages/cashbox/allCustomers",
        }}
        asChild
      >
        <TouchableOpacity style={styles.inputContainer}>
          <View style={styles.userIconCon}>
            <Feather name="user" size={24} color={Colors.text} />
          </View>
          <Text style={styles.text}>Select customers</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={{
          pathname: "/pages/parties/parties",
        }}
        asChild
      >
        <TouchableOpacity style={styles.plusCon}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    height: 50,
    borderRadius: radius.medium,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  userIconCon: {
    borderWidth: 1,
    borderRadius: radius.small,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.border,
  },
  text: {
    flex: 1,
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  plusCon: {
    backgroundColor: Colors.white,
    borderRadius: radius.medium,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SearchCustomerAndAddCustomer;
